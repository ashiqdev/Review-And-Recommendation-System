const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const slug = require('slugs');

const IspSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please Enter a ISP name',
  },
  slug: String,
  coverageArea: {
    type: String,
    trim: true,
    required: 'Please enter coverage area',
  },
  created: {
    type: Date,
    default: Date.now,
  },

  location: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: [
      {
        type: Number,
        required: 'You must supply coordinates!',
      },
    ],
    address: {
      type: String,
      required: 'You must supply an address!',
    },
  },

  photo: String,
  packageDetails: [
    {
      type: String,
      trim: true,
    },
  ],

  // packageAmount: {
  //   type: Number,
  //   required: 'Enter the amount of package',
  // },
});

IspSchema.pre('save', async function(next) {
  if (!this.isModified('name')) {
    next(); // skip it
    return; // stop this function from running
  }
  this.slug = slug(this.name);
  // find other stores that have a slug of wes, wes-1, wes-2
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const ispsWithSlug = await this.constructor.find({
    slug: slugRegEx,
  });
  if (ispsWithSlug.length) {
    this.slug = `${this.slug}-${ispsWithSlug.length + 1}`;
  }
  next();
  // TODO make more resiliant so slugs are unique
});

module.exports = mongoose.model('Isp', IspSchema);
