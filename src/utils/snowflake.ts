class IdProvider {
  // 生成ID的时间戳offset值 = 2000-01-01 你也可以随便选一天(整个ID元时间)
  epoch: number = new Date().getTime();
  // 机器ID (可以不填写，0 = 占1位, 异步生成设置不同的ID)
  wid: number;
  // 数据中心ID (也可以不填写，0 = 占1位, nodeJs分布式使用填写不同ID, 前端用无所谓)
  cid: number;
  // 当前生成的序列 用于offset整个生成的ID
  seq: number = 0;
  // 上一时间戳
  lastTimestamp: number = -1;

  // 机器ID (worker 可配置启用)
  widBits: number = 4;
  // 数据中心ID (datacenter 可配置启用)
  cidBits: number = 4;
  // 毫秒内自增位数(意味着最大不重复数位数)
  seqBits: number = 8;
  // 机器ID偏左移(seqBits)位 (当前 = 8)
  widShift: number = this.seqBits;
  // 数据中心ID左移(seqBits + widBits)位 (当前 = 8 + 4)
  cidShift: number = this.seqBits + this.widBits;
  // 时间毫秒左移(this.seqBits + this.widBits + this.cidBits)位 (当前 = 8 + 4 + 4)
  timestampLShift: number = this.seqBits + this.widBits + this.cidBits;

  // wid掩码 (当前 = 最大不超过2 ^ 4 - 1 = 15)
  maxWidSize: number = -1 ^ (-1 << this.widBits);
  // cid掩码 (当前 = 最大不超过2 ^ 4 - 1 = 15)
  maxCidSize: number = -1 ^ (-1 << this.cidBits);
  // seq掩码 (当前 = 最大不超过2 ^ 8 - 1 = 255) 这个意味着连续生成的记录不能超过该条数。
  maxSeqSize: number = -1 ^ (-1 << this.seqBits);

  // 初始化的时候可以选择指定这两个ID
  constructor(wid: number = 0, cid: number = 0) {
    if (wid > this.maxWidSize || wid < 0) {
      throw new Error(
        `[EL-DEBUG]: worker Id can't be greater than ${this.maxWidSize} or less than 0.`
      );
    }
    if (cid > this.maxCidSize || cid < 0) {
      throw new Error(
        `[EL-DEBUG]: datacenter Id can't be greater than ${this.maxCidSize} or less than 0.`
      );
    }
    // 实例化的时候要确定长度用(总长度 = [seqBits, wid, cid].join('').length)。
    this.wid = wid;
    this.cid = cid;
    // this.seqBits = seqBits;
  }

  // 发号器 - 这个是有上下文的，因为很短时间执行时间种子来不及刷新会导致连号。
  nextId(bias?: number) {
    // 获取时间种子
    let timestamp = IdProvider.genTimeSeed();
    // 自检测纠错步骤
    if (timestamp < this.lastTimestamp) {
      throw new Error(`[EL-DEBUG]: Clock moved backwards.
        Refusing to generate id for ${
          this.lastTimestamp - timestamp
        } milliseconds.`);
    }
    // 如果时间戳与上次时间戳相同
    if (this.lastTimestamp === timestamp) {
      // 当前毫秒内，则+1，与一下sequenceMask确保sequence不会超出上限
      // 如果你的机器性能很NB 可以去类上面把掩码改的大一点 不过事情都是相对的。
      this.seq = (this.seq + 1) & this.maxSeqSize;
      // 当前毫秒内计数满了，则等待下一秒
      if (this.seq === 0) {
        timestamp = IdProvider.tilNextMillis(this.lastTimestamp);
      }
    } else {
      // 重制序列状态
      this.seq = 0;
    }

    // 记录上次的时间戳
    this.lastTimestamp = timestamp;

    // ID偏移组合生成最终的ID，并返回
    // 即使一毫秒生成一个id在2 ** 16 = 65秒内生成的id不会重复，基本上前端很少有需要连续生成id，而且一毫秒一次跑65秒的场景。
    // 也很少出现跑的太快在1毫秒内把所有seq周期跑完的场景(255次机会)
    // 上两个参数都可以通过调节seq位数让程序支持更强大的硬件
    // 太长的id存储空间也会增加，所以时间与空间不可兼得，需要按需适当调整。
    const nextId =
      ((timestamp - this.epoch) << this.timestampLShift) |
      (this.cid << this.cidShift) |
      (this.wid << this.widShift) |
      this.seq;

    // 确认符号(bias)
    return bias ? bias * Math.abs(nextId) : nextId;
  }

  // 核心算法 - 当生成的id冲突，则等待下一次计算
  static tilNextMillis(lastTimestamp: number) {
    let timestamp = IdProvider.genTimeSeed();
    while (timestamp <= lastTimestamp) {
      timestamp = IdProvider.genTimeSeed();
    }
    return timestamp;
  }

  // 获取当前系统时间
  static genTimeSeed(): number {
    return Date.now();
  }

  // Builder - 默认的实例
  static getInstance() {
    return new IdProvider();
  }
}

const idProvider = IdProvider.getInstance();

const getSnowFlake = (sign?: number) => idProvider.nextId(sign);

export default {
  getSnowFlake
};
