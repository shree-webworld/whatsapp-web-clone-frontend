import {atom} from "recoil";


export const accountState = atom({
                                    key: 'accountState',
                                    default: '',
                                });

export let personState = atom({
                                  key: "personState",
                                  default:{}
                            });
