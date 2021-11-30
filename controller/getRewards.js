const rewardsModal = require("../modal/rewardsmodal");

const getRewards = async (req, res) => {
  // console.log("here===",req.user)
  let query = [
    {
      $match: {
        reward_name: { $regex: "" },
      },
    },
  ];
  if (req.query.status) {
    query.push({
      $match: {
        status: req.query.status,
      },
    });
  }

  if (req.query.startdate && req.query.enddate) {
    query.push({
      $match: {
        createdAt: {
          $gte: new Date(req.query.startdate),
          $lt: new Date(req.query.enddate),
        },
      },
    });
  }

  if (req.query.sortBy) {
    let sortOrder = 1;
    if (req.query.sortOrder === "desc") sortOrder = -1;
    const sort = {};
    sort[req.query.sortBy] = sortOrder;
    query.push({
      $sort: sort,
    });
  } else {
    query.push({
      $sort: { createdAt: 1 },
    });
  }
  const limit = 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const skip = (page - 1) * limit;
  query.push({
    $skip: skip,
  });
  query.push({
    $limit: limit,
  });
  try {
    // console.log(query)
    const rewards = await rewardsModal.aggregate(query);
    res.status(200).send(rewards);
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = getRewards;
