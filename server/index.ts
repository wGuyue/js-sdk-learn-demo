import { BaseClient } from '@lark-base-open/node-sdk';

// 新建 BaseClient，填写需要操作的 appToken 和 personalBaseToken
const client = new BaseClient({
  appToken: 'xxx',
  personalBaseToken: 'xxx'
});

const TABLEID = 'xxx';

interface IRecord {
  record_id: string;
  fields: Record<string, any>
}

// 查找替换
async function searchAndReplace(from: string, to: string) {
  // 获取当前表的字段信息
  const res = await client.base.appTableField.list({
    params: {
      page_size: 100,
    },
    path: {
      table_id: TABLEID,
    }
  });
  const fields = res?.data?.items || [];
  // 文本列
  const textFieldNames = fields.filter(field => field.ui_type === 'Text').map(field => field.field_name);

  // 遍历记录
  for await (const data of await client.base.appTableRecord.listWithIterator({ params: { page_size: 50 }, path: { table_id: TABLEID } })) {
    const records = data?.items || [];
    const newRecords: IRecord[] = [];
    for (const record of records) {
      const { record_id, fields } = record || {};
      // 修改部分：去掉类型断言
      const entries = Object.entries(fields);
      const newFields: Record<string, string> = {};
      for (const [key, value] of entries) {
        // 替换多行文本字段值
        if ((textFieldNames.includes(key)) && typeof value === 'string') {
          const newValue = value.replace(new RegExp(from, 'g'), to);
          // 把需要替换的字段加入 newFields
          newValue !== value && (newFields[key] = newValue);
        }
      }
      // 需要替换的记录加入 newRecords
      Object.keys(newFields).length && newRecords.push({
        record_id: record_id as string,
        fields: newFields,
      })
    }

    // 批量更新记录
    await client.base.appTableRecord.batchUpdate({
      path: {
        table_id: TABLEID,
      },
      data: {
        records: newRecords
      }
    })
  }
  console.log('success')
}

searchAndReplace('abc', '23333333');

console.log('start')