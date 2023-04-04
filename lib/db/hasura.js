/*
This is an example snippet - you should consider tailoring it
to your service.
*/

async function fetchGraphQL(operationsDoc, operationName, variables) {
	const result = await fetch(
		'https://resolved-marmoset-55.hasura.app/v1/graphql',
		{
			headers: {
				'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_SECRET,
			},
			method: 'POST',
			body: JSON.stringify({
				query: operationsDoc,
				variables: variables,
				operationName: operationName,
			}),
		}
	);

	return await result.json();
}

const operationsDoc = `
  mutation InsertStats($userId: Int, $favorited: String, $videoId: String) {
    insert_stats(objects: {userId: $userId, favorited: $favorited, videoId: $videoId, watched: true}) {
      affected_rows
      returning {
        watched
        id
        userId
        favorited
        videoId
      }
    }
  }
`;

function executeInsertStats(userId, favorited, videoId) {
	return fetchGraphQL(operationsDoc, 'InsertStats', {
		userId: userId,
		favorited: favorited,
		videoId: videoId,
	});
}

export async function startExecuteInsertStats(userId, favorited, videoId) {
	const { errors, data } = await executeInsertStats(
		userId,
		favorited,
		videoId
	);

	if (errors) {
		// handle those errors like a pro
		console.error(errors);
	}

	// do something great with this precious data
	console.log(data);
}

// startExecuteInsertStats(userId, favorited, videoId);
