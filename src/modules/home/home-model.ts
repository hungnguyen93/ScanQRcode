import {action, makeObservable, observable, runInAction} from 'mobx';
import {CCCDModel, ICCCD} from '~models/cccd';
import {IResponseData} from '~models/common.type';
import {cccdService} from '~services';
import moment from 'moment';
export type TObjText = Omit<ICCCD, 'id' | 'createdAt' | 'updatedAt'>;

class HomeModel {
  isLoading: boolean = false;
  data: IResponseData<ICCCD> = {
    items: [],
    meta: {
      totalPages: 1,
      currentPage: 0,
    },
  };
  objText: TObjText = {
    no: '',
    name: '',
    birthday: '',
    gender: '',
    address: '',
    issuedDate: '',
  };
  openScan: boolean = false;

  constructor() {
    makeObservable(this, {
      openScan: observable,
      isLoading: observable,
      data: observable,
      objText: observable,
      setLoading: action,
      getListCCCD: action,
      onChangeText: action,
      setObjText: action,
      setOpenScan: action,
      createCCCD: action,
    });
  }

  setOpenScan = (value: boolean = false) => {
    this.openScan = value;
  };

  setLoading = (value: boolean) => {
    this.isLoading = value;
  };

  getListCCCD = async (page: number) => {
    const checkPage = page === 1;
    if (checkPage) this.setLoading(true);
    try {
      const res = await cccdService.getListCCCD(page);
      const {mapDataCCCD} = CCCDModel();
      const resMap = mapDataCCCD(res.data);
      if (checkPage) {
        runInAction(() => {
          this.data = resMap;
        });
      } else {
        runInAction(() => {
          this.data = {
            items: [...this.data.items, ...resMap.items],
            meta: resMap.meta,
          };
        });
      }
    } catch (error) {
    } finally {
      if (checkPage) this.setLoading(false);
    }
  };

  createCCCD = async () => {
    const {address, birthday, gender, issuedDate, name, no} = this.objText;
    try {
      const res = await cccdService.create({
        address,
        birthday,
        gender,
        issuedDate,
        name,
        no,
      });

      console.log('creter ', res);
      this.setObjText({
        no: '',
        name: '',
        birthday: '',
        gender: '',
        address: '',
        issuedDate: '',
      });
    } catch (error) {}
  };

  onChangeText = (text: string, key: string) => {
    this.setObjText({
      ...this.objText,
      [key]: text,
    });
  };

  setObjText = (value: TObjText) => {
    this.objText = value;
  };

  handleQR = (event: any) => {
    console.log(event)
    const data = event.nativeEvent.codeStringValue;
    const arrString = data.split('|');
    this.setObjText({
      address: arrString[5],
      birthday: moment(arrString[3], 'DDMMYYYY').format('YYYY/MM/DD'),
      issuedDate: moment(arrString[6], 'DDMMYYYY').format('YYYY/MM/DD'),
      gender: arrString[4],
      name: arrString[2],
      no: arrString[0] + ' / ' + arrString[1],
    });
    this.setOpenScan(false);
  };
}

export {HomeModel};
