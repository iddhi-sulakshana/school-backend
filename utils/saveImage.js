module.exports = async function (image, name) {
  const fileName = `${name}.${image.name.split(".")[1]}`;
  await image.mv(`./public/${fileName}`);
  return fileName;
};
