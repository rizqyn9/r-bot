import { createClient } from "redis";

(async () => {
	const RedisClient = createClient();

	await RedisClient.connect();
	await RedisClient.del("noderedis:jsondata");

	await RedisClient.json.set("noderedis:jsondata", "$", {
		name: "Roberta McDonald",
		pets: [
			{
				name: "Rex",
				species: "dog",
				age: 3,
				isMammal: true,
			},
			{
				name: "Goldie",
				species: "fish",
				age: 2,
				isMammal: false,
			},
		],
	});

	await RedisClient.expire("noderedis:jsondata", 1);

	setTimeout(async () => {
		let results = await RedisClient.json.get("noderedis:jsondata");

		// { '.pets[1].name': 'Rex', '.pets[1].age': 3 }
		console.log(results);
	}, 1500);
	// Retrieve the name and age of the second pet in the pets array.
})();
