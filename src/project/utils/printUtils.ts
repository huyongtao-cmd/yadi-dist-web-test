//创建打印iframe
const JsBarcode = require('jsbarcode');
const createPrintIframe = () => {
  if (document.getElementById('printIframe')) {
    document.body.removeChild(document.getElementById('printIframe'));
  }
  let iframe = document.createElement('iframe');
  iframe.id = 'printIframe';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.display = 'none';
  return iframe;
};
//创建table表头
const createCaption = (title) => {
  let caption = document.createElement('div');
  caption.innerText = title;
  return caption;
};
//根据倍数拆分数组
const sliceArry = (num, data) => {
  let submitData = [];
  let tempNum = 0;
  for (let i = 0; i < data.length; i++) {
    if (i % num == 0 && i != 0) {
      submitData.push(data.slice(tempNum, i));
      tempNum = i;
    }
    if (i + 1 == data.length) {
      submitData.push(data.slice(tempNum, i + 1));
    }
  }
  return submitData;
};
// //创建table基础信息
// const createThead = (data, columns) => {
//   let thead = document.createElement('thead');
//   let tr = document.createElement('tr');
//   console.log('tempData', data);
//   let dataLength = data.length;
//   data.forEach((row, index) => {
//     let tempTh = document.createElement('th');
//     tempTh.style.width = row.width + 'px' || '160px';
//     // tempTh.style.
//     // style="white-space: nowrap"
//     tempTh.setAttribute('nowrap', 'nowrap');
//     tempTh.innerText = row.label;
//     let tempTd = document.createElement('td');
//     if (index == dataLength - 1) {
//       tempTd.setAttribute('colspan', columns.length);
//     }
//     tempTd.innerText = row.value;
//     tr.appendChild(tempTh);
//     tr.appendChild(tempTd);
//   });
//   thead.appendChild(tr);
//   return thead;
// };
//创建基础信息
const createThead = (data, baseInfoDataBox, span) => {
  //根据传过来的每行展示多少个动态设置每个元素的宽度
  let tempwidth = Math.round((10 / span) * 10);
  data.map((row) => {
    let tempDom = document.createElement('div');
    tempDom.setAttribute('class', 'printBase_box_content');
    tempDom.style.width = tempwidth + '%';
    let labeldom = document.createElement('div');
    labeldom.setAttribute('class', 'printBase_box_title');
    labeldom.innerText = row.label + ':';
    let textdom = document.createElement('div');
    textdom.setAttribute('class', 'printBase_box_text');
    textdom.innerText = row.value;
    tempDom.appendChild(labeldom);
    tempDom.appendChild(textdom);
    baseInfoDataBox.appendChild(tempDom);
  });
};
//创建表格表头内容
const createTableThead = (coluns) => {
  let thead = document.createElement('thead');
  let tr = document.createElement('tr');
  coluns.map((row) => {
    let tempTh = document.createElement('th');
    tempTh.style.width = row.width + 'px' || '160px';
    tempTh.innerText = row.title;
    tr.appendChild(tempTh);
  });
  thead.appendChild(tr);
  return thead;
};
//创建表格里面数据
const createTableData = (columns, tableData) => {
  let tbody = document.createElement('tbody');
  tableData.map((row, index) => {
    let tr = document.createElement('tr');
    columns.map((rows) => {
      let tempTd = document.createElement('td');
      tempTd.style.textAlign = 'center';
      tempTd.innerText = row[rows.dataIndex];
      tr.appendChild(tempTd);
    });
    // tableData[columns[index].dataIndex]
    tbody.appendChild(tr);
  });
  return tbody;
};
//创建底部签名
const createFoot = (footData) => {
  let tDom = document.createElement('div');
  tDom.setAttribute('class', 'printFoot');
  footData.map((row) => {
    let tDiv = document.createElement('div');
    tDiv.setAttribute('class', 'printFoot-content');
    tDiv.style.width = Math.round((10 / footData.length) * 10) + '%';
    let tSpanTitle = document.createElement('span');
    tSpanTitle.innerText = row.title;
    let tSpanValue = document.createElement('span');
    tSpanValue.innerText = row.value || '';
    tDiv.appendChild(tSpanTitle);
    tDiv.appendChild(tSpanValue);
    tDom.appendChild(tDiv);
  });
  return tDom;
};
//创建打印模版
const createPrintTem = () => {
  let iframe = createPrintIframe();
  document.body.appendChild(iframe);
  let style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML =
    '* {padding:0px;margin:0px}' +
    '@page { size: landscape;margin: 0mm;  }' +
    'table{border-collapse: collapse;font-size:16px}' +
    'table tr th { border: 1px solid;padding:8px 8px;}' +
    'table tr td { border: 1px solid;padding: 8px 8px;}' +
    ' .print { width: 1100px;display: flex;flex-direction: column;align-items: center;padding:50px; font-size:18px}' +
    ' .printTitle {display: flex;flex-direction: column;align-items: center;width: 100%;margin-bottom: 20px;}' +
    ' .printBase {display: flex;flex-direction: column;align-items: center;width: 100%; margin-bottom: 40px}' +
    ' .printBase_box {display: flex;flex-direction: row;width: 100%; line-height:22px;margin-bottom: 10px}' +
    ' .printBase_box_content {display: flex;flex-direction: row;}' +
    ' .printBase_box_text {padding-left:5px;}' +
    ' .printFoot {display:flex;flex-direction:row;width:100%;margin-top: 20px;}';

  //创建大盒子
  let box = document.createElement('div');
  box.setAttribute('class', 'print');
  //创建标题盒子
  let titlebox = document.createElement('div');
  titlebox.setAttribute('class', 'printTitle');
  // 创建基础信息盒子
  let basebox = document.createElement('div');
  basebox.setAttribute('class', 'printBase');

  box.appendChild(titlebox);
  box.appendChild(basebox);

  iframe.contentWindow.document.head.appendChild(style);
  iframe.contentWindow.document.body.appendChild(box);
  return { iframe, box, titlebox, basebox };
};

// 打印
const printFn = (config, baseInfo, columns, tableData, footData) => {
  let { iframe, box, titlebox, basebox } = createPrintTem();
  let footdom = createFoot(footData);
  let tempDiv = document.createElement('div');
  tempDiv.style.width = '100%';
  // tempDiv.style.border = '1px solid';
  iframe.contentWindow.document.body.children[0].appendChild(tempDiv); // 增加table
  iframe.contentWindow.document.body.children[0].appendChild(footdom); // 增加底部

  //给table增加标题
  titlebox.appendChild(createCaption(config.proTitle));
  titlebox.appendChild(createCaption(config.title));

  //创建打印table
  let table = document.createElement('table');
  table.setAttribute('width', '100%');
  table.setAttribute('cellspacing', '0');
  table.setAttribute('cellpadding', '0');

  //处理有多少个theard,创建table基础信息
  let tempData = sliceArry(config.span, baseInfo);
  console.log('tempData', tempData);
  tempData.map((row, index) => {
    let baseInfoDataBox = document.createElement('div');
    baseInfoDataBox.setAttribute('class', 'printBase_box');
    createThead(row, baseInfoDataBox, config.span);
    basebox.appendChild(baseInfoDataBox);
  });
  //创建table数据
  let tableThead = createTableThead(columns);
  table.appendChild(tableThead);
  let tableTbody = createTableData(columns, tableData);
  table.appendChild(tableTbody);
  tempDiv.appendChild(table);

  if (config.orderNum) {
    let barcodeContainer = document.createElement('div');
    barcodeContainer.setAttribute('class', 'barcodeContainer');
    barcodeContainer.style.textAlign = 'right'
    let img = document.createElement('img');
    img.setAttribute('id', 'barcode');
    barcodeContainer.appendChild(img);
    titlebox.appendChild(barcodeContainer);
    JsBarcode(
      iframe.contentWindow.document.getElementById('barcode'),
      config.orderNum || '未配置编码',
      {
        width: 2,
        height: 40,
      }
    );
  }

  setTimeout(() => {
    //打印
    iframe.contentWindow.print();
  }, 1000);


  //打印
  // iframe.contentWindow.print();
};

export { createPrintIframe, createPrintTem, printFn };
