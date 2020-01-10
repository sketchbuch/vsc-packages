import { TabboxItems } from '../../types';

const mockTabBoxItems: TabboxItems = [
  {
    button: {
      label: 'Readme',
      selected: true,
    },
    content: () => 'Readme content',
    emptyMessage: 'No readme',
    id: 'readme',
  },
  {
    button: {
      label: 'Developers',
      selected: false,
    },
    content: () => 'Developers content',
    emptyMessage: 'No developers',
    id: 'developers',
  },
];

export default mockTabBoxItems;
