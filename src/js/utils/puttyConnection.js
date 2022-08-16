function puttyConnection() {
  const PUTTY = `PuTTY_portable.exe`;
  const host = arguments[0];

  wsh.Run(pathDistr + PUTTY + host);

  for (let index = 1; index < arguments.length; index++) setTimeout(() => wsh.SendKeys(arguments[index]), 1000);
}
