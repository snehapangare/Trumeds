export const saveToken = (access, refresh) => {
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const claerToken = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};