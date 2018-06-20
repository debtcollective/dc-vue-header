/**
 * @typedef {Object} Link
 * @prop {string} href
 * @prop {string[]?} roles
 * @prop {string} text
 */

/**
 * @typedef {Object} User
 * @prop {{ name: string }[]} groups
 */

/**
 * @param {Link[]} links
 * @returns {(user: User | null) => Link[]}
 */
const filterLinks = links => user => {
  if (user === null) return links.filter(({ roles = [] }) => !roles.length);

  const groups = user.groups.map(g => g.name);

  return links.filter(({ roles = [] }) => {
    if (!roles.length || user.admin) return true;

    return roles.filter(role => groups.indexOf(role) !== -1).length;
  });
};

export default filterLinks;
