import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useBottomBar } from './use-bottom.ts';
import TabIcon from 'components/bottom-navigation/tab-icon/icon.index';
import { styles } from './bottom.styles';

const Tab = createBottomTabNavigator();
const BottomBar = () => {
	const { screens } = useBottomBar();
	return (
		<Tab.Navigator>
			{
				screens?.map((item, id) => (
					<Tab.Screen key={id} name={item.name} component={item.Screen} options={{
						headerShown: false,
						tabBarStyle: styles.tabStyles,
						tabBarButton: (props) => <TabIcon focused={props?.accessibilityState?.selected} icon={item.icon}
														  name={item.name} id={id} />,
					}} />
				))
			}
		</Tab.Navigator>
	);
};

export default BottomBar;
