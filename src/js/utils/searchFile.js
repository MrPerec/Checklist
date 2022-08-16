function searchFile(file, folder) {
  folder = new Enumerator(fileSystem.GetFolder(folder).files);

  for (; !folder.atEnd(); folder.moveNext()) if (String(folder.item()).search(file) != -1) return String(folder.item());
  return false;
}
