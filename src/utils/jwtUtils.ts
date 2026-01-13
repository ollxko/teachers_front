export const parseJwt = (token: string): any | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const decoded = parseJwt(token);
  if (!decoded?.exp) return true;

  // exp в секундах, Date.now() в миллисекундах
  return decoded.exp * 1000 < Date.now();
};

export const getTokenExpirationDate = (token: string): Date | null => {
  const decoded = parseJwt(token);
  if (!decoded?.exp) return null;

  return new Date(decoded.exp * 1000);
};

export const getUserIdFromToken = (token: string): string | null => {
  const decoded = parseJwt(token);
  return decoded?.sub || decoded?.id || null;
};

export const getRolesFromToken = (token: string): string[] => {
  const decoded = parseJwt(token);
  if (!decoded) return [];

  if (Array.isArray(decoded.roles)) {
    return decoded.roles;
  } else if (decoded.role) {
    return [decoded.role];
  } else if (decoded.realm_access?.roles) {
    return decoded.realm_access.roles;
  }

  return [];
};

export const getTokenData = (token: string) => {
  const decoded = parseJwt(token);
  if (!decoded) return null;

  return {
    id: decoded.sub || decoded.id,
    username: decoded.preferred_username || decoded.username || decoded.name,
    email: decoded.email,
    roles: getRolesFromToken(token),
    expiration: decoded.exp ? new Date(decoded.exp * 1000) : null,
    issuedAt: decoded.iat ? new Date(decoded.iat * 1000) : null,
  };
};
