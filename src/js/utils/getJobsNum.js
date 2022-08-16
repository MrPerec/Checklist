function getJobsNum() {
  const COMMAND_JOB = process.env.COMMAND_JOB;
  const CONNECTION_OPTIONS = process.env.CONNECTION_OPTIONS;

  const connectionObj = new ActiveXObject(`ADODB.Connection`);
  const commandObj = new ActiveXObject(`ADODB.Command`);
  let recordsetObj = new ActiveXObject(`ADODB.Recordset`);
  let count = 0;

  connectionObj.Open(CONNECTION_OPTIONS);

  commandObj.ActiveConnection = connectionObj;
  commandObj.CommandText = COMMAND_JOB;
  recordsetObj = commandObj.Execute;

  if (!recordsetObj.EOF) {
    let time = new Date();

    let groupId = ``;
    let statusJob = ``;
    let className = ``;

    recordsetObj.MoveFirst();
    while (!recordsetObj.EOF) {
      const jobTime = new Date(recordsetObj.Fields(`STARTDATETime`).Value);

      if (time > jobTime) {
        time = jobTime;
        groupId = String(recordsetObj(`GROUPID`));
        statusJob = String(recordsetObj(`STATUS`));
        className = String(recordsetObj(`CLASSNAME`));
      }
      count++;
      recordsetObj.MoveNext();
    }
    return { count, groupId, className, statusJob, time };
  }
  while (recordsetObj.EOF) return false;
}
