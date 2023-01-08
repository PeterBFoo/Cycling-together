const bycicleModel = require("../../src/models/bycicle/Bycicle.js");

test("Create a new bycicle with empty properties", () => {
	let bycicle = bycicleModel.get();
	expect(bycicle);
});

test("Create a new bycicle with properties", () => {
	let bycicle = bycicleModel.get();
	let p = {
		"category": "Road Bike",
		"brand": "Specialized",
		"weight": 8.3,
		"frame": "Carbon fiber",
		"suspension": null,
		"fork": "Specialized FACT carbon fiber",
		"wheels": "Specialized Roval CLX 50 Disc",
		"wheelSize": 62,
		"brakes": "Shimano Ultegra hydraulic disc",
		"groupSet": "Shimano Ultegra Di2 electronic",
		"driveTrain": "2x11 speed",
		"frontTravel": null,
		"seatpost": "Specialized S-Works carbon fiber",
		"storeId": 1
	};
	bycicle.setup(p);

	let properties = Object.getOwnPropertyNames(bycicle.properties());
	let propertiesDetails = bycicle.properties();

	for (let i = 0; i < properties.length; i++) {
		let property = properties[i];
		if (propertiesDetails[property].allowNull && bycicle[property] === null) {
			expect(bycicle[property]).toBeFalsy();
		} else {
			expect(bycicle[property]).toBeTruthy();
		}

	}
});

test("Create a new bycicle with wrong property types", () => {
	let bycicle = bycicleModel.get();
	let setup = () => {
		bycicle.setup(
			{
				category: "HVAC",
				brand: "Bike",
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

test("Create a new bycicle without optional parameters", () => {
	let bycicle = bycicleModel.get().setup(
		{
			"category": "Mountain Bike",
			"brand": "Trek",
			"weight": 14.5,
			"frame": "Aluminum",
			"fork": "RockShox Recon RL",
			"wheelSize": 73,
			"brakes": "Shimano MT200 hydraulic disc",
			"driveTrain": "1x10 speed",
			"seatpost": "Bontrager Rhythm Elite",
			"storeId": 1
		}
	);

	expect(bycicle).toBeTruthy();
	expect(bycicle.suspension).toBeFalsy();
	expect(bycicle.wheels).toBeFalsy();
	expect(bycicle.groupSet).toBeFalsy();
	expect(bycicle.frontTravel).toBeFalsy();
});
