function getDiskFreeSpace(diskLetter) {
  if (connectNetworkDrive(diskLetter)) {
    const drivesCollection = new Enumerator(fileSystem.Drives);

    for (; !drivesCollection.atEnd(); drivesCollection.moveNext()) {
      const driveItem = drivesCollection.item();
      if (driveItem.DriveLetter === diskLetter)
        return `${driveItem.DriveLetter}: ${driveItem.ShareName} свободно ${convertSize(driveItem.AvailableSpace)} из ${convertSize(
          driveItem.TotalSize
        )}`;
    }
  }
  if (!connectNetworkDrive(diskLetter)) return;
}
