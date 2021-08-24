import { ElEditTableColumns } from '../index';
import { Validator, ValidatorResult } from 'jsonschema';
import { Schema } from 'jsonschema';

const validate = (data: any, columns: ElEditTableColumns[]): any => {
  const NewVa = new Validator();
  if (Array.isArray(data)) {
    const schema = getArraySchema(columns);
    const result = dealResult(NewVa.validate(data, schema));
    return new Promise((resolve, reject) => {
      resolve(result);
    });
  } else {
    const schema = getSchema(columns);
    const result = dealResult(NewVa.validate(data, schema));
    return new Promise((resolve, reject) => {
      resolve(result);
    });
  }
};
const dealResult = (result: ValidatorResult) => {
  // todo  这里可以对得到的结果进行一个操作,或者缓存schema
  return result;
};
const getSchema = (columns: ElEditTableColumns[]) => {
  let pro = {};
  columns.forEach((v) => {
    if (!!v.rule && v.editable) {
      pro[v.dataIndex ? v.dataIndex : ''] = {
        ...v.rule
      };
    }
  });
  let template = {
    title: 'record',
    description: 'record',
    type: 'object',
    properties: pro,
    required: [
      ...columns
        .filter((v) => {
          if (v.rule && v.rule.required) {
            return v;
          }
        })
        .map((i) => {
          return i.dataIndex;
        })
    ]
  };
  return template;
};
const getArraySchema = (columns: ElEditTableColumns[]) => {
  let pro = {};
  columns.forEach((v) => {
    if (!!v.rule && v.editable) {
      pro[v.dataIndex ? v.dataIndex : ''] = {
        ...v.rule
      };
    }
  });

  let template = {
    title: 'dataSource',
    description: 'dataSource',
    type: 'array',
    items: {
      type: 'object',
      properties: pro,
      required: [
        ...columns
          .filter((v) => {
            if (v.rule && v.rule.required) {
              return v;
            }
          })
          .map((i) => {
            return i.dataIndex;
          })
      ]
    }
  };
  return template;
};

export default validate;
