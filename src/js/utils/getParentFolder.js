function getParentFolder() {
  if (window.location.host)
    return fileSystem
      .GetParentFolderName(window.location.href)
      .replace(/file:\/+/g, '\\\\\\\\')
      .replace(/\//g, '\\\\')
      .replace(/%20/g, ' ');
  if (!window.location.host)
    return fileSystem.GetParentFolderName(window.location.pathname).replace(/\/+/, '').replace(/\//g, '\\').replace(/%20/g, ' ');
}
