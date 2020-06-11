import { NpmContributors, NpmMaintainer } from '..';

export const isContributor = (
  npmType: NpmMaintainer | NpmContributors
): npmType is NpmContributors => {
  return (npmType as NpmContributors).url !== undefined;
};
