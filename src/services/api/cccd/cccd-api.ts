import {BaseAPI} from '../base-api';
import {CCCD, USER} from '../api-url';
import {ICCCD} from '~models/cccd';

type TCreateCCCD = Omit<ICCCD, 'id' | 'createdAt' | 'updatedAt'>;

class CCCDService {
  create = async (body: TCreateCCCD) => {
    const res = await BaseAPI.post(CCCD.CCCD, body);
    return res;
  };

  getListCCCD = async (page: number, limit: number = 10) => {
    const res = await BaseAPI.get(
      CCCD.CCCD,
      {},
      {
        params: {
          page,
          limit,
        },
      },
    );
    return res;
  };
}
export {CCCDService};
