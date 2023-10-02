import {DTO, IResponseData} from './common.type';

export interface ICCCD extends DTO {
  no: string;
  name: string;
  birthday: string;
  gender: string;
  address: string;
  issuedDate: string;
}

export const CCCDModel = () => {
  const mapDataCCCD = (data: IResponseData<ICCCD>) => {
    const {items, meta} = data;
    const dataMap: IResponseData<ICCCD> = {
      meta,
      items,
    };
    return dataMap;
  };
  return {mapDataCCCD};
};
