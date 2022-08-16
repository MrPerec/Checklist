function connectNetworkDrive(driveLetter) {
  const localDrives = network.EnumNetworkDrives();

  let drivePath = '';
  driveLetter = driveLetter + ':';

  switch (String(driveLetter)) {
    case String('F:'):
      drivePath = process.env.drivePathF;
      break;
    case String('G:'):
      drivePath = process.env.drivePathG;
      break;
    case String('K:'):
      drivePath = process.env.drivePathK;
      break;
    case String('P:'):
      drivePath = process.env.drivePathP;
      break;
    case String('S:'):
      drivePath = process.env.drivePathS;
      break;
    case String('W:'):
      drivePath = process.env.drivePathW;
      break;
  }

  if (fileSystem.FolderExists(drivePath)) {
    for (let i = 0; i < localDrives.length; i += 2)
      if (localDrives.Item(i) === driveLetter) network.RemoveNetworkDrive(driveLetter, true, true);
    network.MapNetworkDrive(driveLetter, drivePath);
    return true;
  }
  if (!fileSystem.FolderExists(drivePath)) return;
}
