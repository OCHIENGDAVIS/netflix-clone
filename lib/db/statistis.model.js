import mongoose, { Schema } from 'mongoose';

const StatisticsSchema = new Schema({
	id: Schema.Types.ObjectId,
	userId: String,
	videoId: String,
	watched: {
		type: Boolean,
		default: false,
	},
	favourited: {
		type: Number,
		default: null,
	},
});

const StatisticsModel =
	mongoose.models.Statistics ||
	mongoose.model('Statistics', StatisticsSchema);

export default StatisticsModel;
