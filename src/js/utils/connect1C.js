function connect1C(userName, dataBase) {
  const usersArr = [
    { domainName: process.env.domainName1, buhName: process.env.buhName1 },
    { domainName: process.env.domainName2, buhName: process.env.buhName2 },
    { domainName: process.env.domainName3, buhName: process.env.buhName3 },
    { domainName: process.env.domainName4, buhName: process.env.buhName4 },
    { domainName: process.env.domainName5, buhName: process.env.buhName5 },
    { domainName: process.env.domainName6, buhName: process.env.buhName6 },
  ];
  const PATH_1C = process.env.PATH_1C;

  for (let index = 0; index < usersArr.length; ++index) {
    let { domainName, buhName } = index;
    if (userName === domainName) return wsh.Run(`${PATH_1C}${dataBase} /N ${buhName}`);
  }

  return wsh.Run(`${PATH_1C}${dataBase}`);
}
