import { configure, shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import NavItems from './NavItems';
import NavItem from './NavItem/NavItem';

configure({ adapter: new Adapter() });

describe('<NavItems />', () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = shallow(<NavItems />)
    });

    it('should render two NavItems if not authenticated', () => {
        expect(wrapper.find(NavItem)).toHaveLength(2);
    });

    it('should render three NavItems if authenticated', () => {
        wrapper.setProps({
            isAuthenticated: true
        });
        expect(wrapper.find(NavItem)).toHaveLength(3);
    });
});