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
  // If no user (not logged in or still being retrieved) then just return the
  // links that don't have roles associated
  if (user === null) return links.filter(({ roles = [] }) => !roles.length);

  // If the user is an admin, then they can see everything so return all the links
  if (user.admin) return links;

  const groups = user.groups.map(g => g.name);

  return links.filter(({ roles = [] }) => {
    // If the link has no roles, always include it
    if (!roles.length) return true;

    // Otherwise only include it if the user has at least one of the right roles/groups
    return roles.filter(role => groups.indexOf(role) !== -1).length;
  });
};

export default filterLinks;
