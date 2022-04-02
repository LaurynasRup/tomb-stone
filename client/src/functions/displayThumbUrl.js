export const displayThumbUrl = url => {
  const thumbUrlArr = url.split('upload/');
  const thumbUrl = `${thumbUrlArr[0]}upload/c_thumb,w_200,g_face/${thumbUrlArr[1]}`;
  return thumbUrl;
};
