const bycicleModel = require("../../src/models/bycicle/Bycicle.js");

test("Create a new bycicle with empty properties", () => {
	let bycicle = bycicleModel.get();
	expect(bycicle);
});

test("Create a new bycicle with properties", () => {
	let bycicle = bycicleModel.get();
	let p = {
		category: "Mountain",
		weight: 10,
		frame: "Carbon",
		suspension: "RockShox",
		fork: "DT Swiss",
		wheels: "Shimano",
		wheelSize: 29,
		brakes: "Shimano",
		groupSet: "RockShox Reverb",
		driveTrain: 1,
		frontTravel: "Asda",
		seatPost: "Decathlon",
		storeId: 1
	};
	bycicle.setup(p);

	let properties = Object.getOwnPropertyNames(bycicle.properties());
	for (let i = 0; i < properties.length; i++) {
		let property = properties[i];
		expect(bycicle[property]).toBeTruthy();
	}
});

test("Create a new bycicle with wrong property types", () => {
	let bycicle = bycicleModel.get();
	let setup = () => {
		bycicle.setup(
			{
				category: "HVAC",
				weight: 1,
				frame: "Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
				suspension: "Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
				fork: "Morbi non quam nec dui luctus rutrum.",
				wheels: "Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
				wheelSize: 1,
				brakes: true,
				groupSet: "Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.",
				driveTrain: 1,
				frontTravel: "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien.",
				seatPost: "Nulla nisl. Nunc nisl.",
				storeId: 1
			}
		);
	};
	expect(setup).toThrow();
});