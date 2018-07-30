export const getWanchainProvider = (networkId = '1') => {
  switch (networkId) {
    case '1':
      return 'http://wanchain.portal.network';
    default:
      return 'http://localhost:8545/';
  }
}

export const getWanchainRegistrarAddress = (networkId = '1') => {
  switch (networkId) {
    case '1':
      return '0x48859467c329854af6ecc363c8ddb393b911586b';
    case '3':
      return '0xeec6bc4d213bf5d7b247a578b9bf13d7443b5546';
    default:
      return '0x0';
  }
}

export const getWanchainRegistryAddress = (networkId = '1') => {
  switch (networkId) {
    case '1':
      return '0xee8d418fd33e69782015ea4313dfd8eb7b1b91ce';
    case '3':
      return '0xe85cfdf43a0db4aa0ec054a57451af7c73d4625b';
    default:
      return '0x0';
  }
}
