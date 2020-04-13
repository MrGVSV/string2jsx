import React from "react";
import renderer from "react-test-renderer";
import String2JSX from "../index";

describe("String2JSX", () => {
	it("renders correctly", () => {
		let conversion = [
			{
				from: /Hello/,
				to: "Goodbye",
			},
			{
				from: /, world/,
				to: <span />,
				isChild: true,
			},
			{
				from: /!/,
				to: <span>...</span>,
			},
		];
		const tree = renderer
			.create(<String2JSX map={conversion}>Hello, world!</String2JSX>)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('returns default "Hello, world!"', () => {
		const tree = renderer
			.create(<String2JSX map={[]}>Hello, world!</String2JSX>)
			.toJSON();
		expect(tree).toMatchSnapshot();
		expect(tree).toBe("Hello, world!");
	});

	it('maintains props', () => {
		let conversion = [
			{
				from: /Hello/,
				to: "Goodbye",
			},
			{
				from: /, world/,
				to: <span style={{ color: "red" }} />,
				isChild: true,
			},
			{
				from: /!/,
				to: <span>...</span>,
				props: {
					className: "kinda-dark-tbh",
				},
			},
		];
		const tree = renderer
			.create(<String2JSX map={conversion}>Hello, world!</String2JSX>)
			.toJSON();
        expect(tree).toMatchSnapshot();
    });
    
    it('uses the given parent', () => {
        let conversion = [
            {
                from: /world/,
                to: "daddy"
            }
        ]
        const tree = renderer
			.create(<String2JSX parent={<div className="parent" />} map={conversion}>Hello, world!</String2JSX>)
			.toJSON();
        expect(tree).toMatchSnapshot();
    })
});
