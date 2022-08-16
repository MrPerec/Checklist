function getClientsNum(aos) {
  const options = [`сессия`, `сессии`, `сессий`];

  const COMMAND_CLIENTS = process.env.COMMAND_CLIENTS;
  const CONNECTION_OPTIONS = process.env.CONNECTION_OPTIONS;

  const connectionObj = new ActiveXObject('ADODB.Connection');
  const commandObj = new ActiveXObject('ADODB.Command');
  let recordsetObj = new ActiveXObject('ADODB.Recordset');

  let counterOfClients = 0;

  connectionObj.Open(CONNECTION_OPTIONS);

  commandObj.ActiveConnection = connectionObj;
  commandObj.CommandText = COMMAND_CLIENTS;
  recordsetObj = commandObj.Execute;

  if (!recordsetObj.EOF) {
    recordsetObj.MoveFirst();
    while (!recordsetObj.EOF) {
      if (recordsetObj.Fields('AOS').Value.slice(0, 6) === aos) counterOfClients += recordsetObj.Fields('counter').Value;
      recordsetObj.MoveNext();
    }
  }
  return `Всего ${counterOfClients} ${declOfNum(counterOfClients, options)}`;
}
