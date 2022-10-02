import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Togglable from './Togglable';

describe('<Togglable />', () => {
	let container;

	beforeEach(() => {
		container = render(
			<Togglable buttonLabel="show...">
				<div className="testDiv">togglable content</div>
			</Togglable>
		).container;
	});

	test('renders its children', async () => {
		await screen.findAllByText('togglable content');
	});

	test('at start the children are not displayed', () => {
		const div = container.querySelector('.togglableContent');
		expect(div).toHaveStyle('display: none');
	});

	test('after clicking the button, children are displayed', () => {
		const button = screen.getByText('show...');
		userEvent.click(button);

		const div = container.querySelector('.togglableContent');
		expect(div).not.toHaveStyle('display: none');
	});

	test('toggled content cannot be closed', () => {
		const button = screen.getByText('show...');
		userEvent.click(button);

		const closeButton = screen.getByText('Cancel');
		userEvent.click(closeButton);

		const div = container.querySelector('.togglableContent');
		expect(div).toHaveStyle('display: none');
	});
});
