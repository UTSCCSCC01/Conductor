import React from 'react';
import './NavBar.css';
import { Menu } from 'antd';

export default function NavBarOne() {
    const items = [
        { label: 'About', key: 'about' }, // remember to pass the key prop
        { label: 'Support', key: 'support' }, // which is required
        {
          label: 'sub menu',
          key: 'submenu',
          children: [{ label: 'item 3', key: 'submenu-item-1' }],
        },
    ];

    return (
        <Menu mode="horizontal" items={items} />
    );
};