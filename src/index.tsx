import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { bitable, IAttachmentField } from '@lark-base-open/js-sdk';
import { Alert, AlertProps } from 'antd';
import { CurrencyCode, FieldType, ICurrencyField, ICurrencyFieldMeta } from '@lark-base-open/js-sdk'; 
import { CURRENCY } from './const'; 
import { Select } from 'antd';
import { getExchangeRate } from './exchange-api'; 
import { Button } from 'antd';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LoadApp/>
  </React.StrictMode>
)


function LoadApp() {
  const [currencyFieldMetaList, setMetaList] = useState<ICurrencyFieldMeta[]>([]) 
  const [selectFieldId, setSelectFieldId] = useState<string>(); 
  const [currency, setCurrency] = useState<CurrencyCode>(); 
  const [info, setInfo] = useState('get table name, please waiting ....');
  const [alertType, setAlertType] = useState<AlertProps['type']>('info');

  useEffect(() => {
    const fn = async () => {
      const table = await bitable.base.getActiveTable();
      const fieldMetaList = await table.getFieldMetaListByType<ICurrencyFieldMeta>(FieldType.Currency); 
      setMetaList(fieldMetaList); 
    };
    fn();
  }, []);
  
  const formatFieldMetaList = (metaList: ICurrencyFieldMeta[]) => { 
    return metaList.map(meta => ({ label: meta.name, value: meta.id })); 
  }; 

  const transform = async () => {
    if (!selectFieldId || !currency) return;
    const table = await bitable.base.getActiveTable();
    const currencyField = await table.getField<ICurrencyField>(selectFieldId);
    const currentCurrency = await currencyField.getCurrencyCode();
    await currencyField.setCurrencyCode(currency);
    const ratio = await getExchangeRate(currentCurrency, currency);
    if (!ratio) return;
    const recordIdList = await table.getRecordIdList();
    for (const recordId of recordIdList) {
      const currentVal = await currencyField.getValue(recordId);
      await currencyField.setValue(recordId, currentVal * ratio);
    }
  }

  return <div>
    <div style={{ margin: 10 }}> 
      <div>Select Field</div> 
      <Select style={{ width: 120 }} onSelect={setSelectFieldId} options={formatFieldMetaList(currencyFieldMetaList)}/> 
    </div> 
    <div style={{ margin: 10 }}>
      <div>Select Currency</div>
      <Select options={CURRENCY} style={{ width: 120 }} onSelect={setCurrency}/>
      <Button style={{ marginLeft: 10 }} onClick={transform}>transform</Button>
    </div>
  </div>  
}