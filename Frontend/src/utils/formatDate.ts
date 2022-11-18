const formatDate = (Date: any) => {
  const slice = Date.slice(0, 19);
  const firstReplace = slice.replaceAll('-', '');
  const secondReplace = firstReplace.replaceAll('T', '');
  const thirdReplace = secondReplace.replaceAll(':', '');

  return thirdReplace;
}

export default formatDate;