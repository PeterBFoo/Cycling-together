const { test, expect } = require("@jest/globals");
const bycicleModel = require("../../src/models/bycicle/BycicleModel.js");

test("Create a new bycicle with empty properties", () => {
	let bycicle = bycicleModel.get();
	expect(bycicle);
});

test("Create some bycicles", () => {
	let bycicle = bycicleModel.get().setup(
		{
			"model": "test",
			"category": "Mountain Bike",
			"brand": "Trek",
			"weight": 14.5,
			"frame": "Aluminum",
			"suspension": "Full suspension",
			"fork": "RockShox Recon RL",
			"wheels": "Bontrager Kovee Comp 23",
			"wheelSize": 73,
			"brakes": "Shimano MT200 hydraulic disc",
			"groupSet": "Shimano Deore",
			"driveTrain": "1x10 speed",
			"frontTravel": "120 mm",
			"seatpost": "Bontrager Rhythm Elite",
			"price": 39.49,
			"storeId": 1,
			"photo": ""
		}
	);
	let bycicle2 = bycicleModel.get().setup(
		{
			"model": "test",
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
			"price": 69.99,
			"seatpost": "Specialized S-Works carbon fiber",
			"storeId": 1,
			"photo": ""
		}
	);
	expect(bycicle == bycicle2).toBeFalsy();
});

test("Create a new bycicle with properties", () => {
	let bycicle = bycicleModel.get().setup(
		{
			"model": "test",
			"category": "Road Bike",
			"brand": "Specialized",
			"weight": 8.3,
			"frame": "Carbon fiber",
			"fork": "Specialized FACT carbon fiber",
			"wheels": "Specialized Roval CLX 50 Disc",
			"wheelSize": 62,
			"brakes": "Shimano Ultegra hydraulic disc",
			"groupSet": "Shimano Ultegra Di2 electronic",
			"driveTrain": "2x11 speed",
			"seatpost": "Specialized S-Works carbon fiber",
			"price": 5000,
			"storeId": 1,
			"photo": null
		}
	);

	let properties = Object.getOwnPropertyNames(bycicle.properties());
	let propertiesDetails = bycicle.properties();

	for (let i = 0; i < properties.length; i++) {
		let property = properties[i];
		if (propertiesDetails[property].allowNull && bycicle[property] === null || propertiesDetails[property].defaultValue === false) {
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
			"model": "test",
			"category": "Mountain Bike",
			"brand": "Trek",
			"weight": 14.5,
			"frame": "Aluminum",
			"fork": "RockShox Recon RL",
			"wheelSize": 73,
			"brakes": "Shimano MT200 hydraulic disc",
			"driveTrain": "1x10 speed",
			"seatpost": "Bontrager Rhythm Elite",
			"price": 1500,
			"storeId": 1,
			"photo": ""
		}
	);

	expect(bycicle).toBeTruthy();
	expect(bycicle.suspension).toBeFalsy();
	expect(bycicle.wheels).toBeFalsy();
	expect(bycicle.groupSet).toBeFalsy();
	expect(bycicle.frontTravel).toBeFalsy();
});
