const User = require("../Model/User");
const axios = require("axios");
const scraper = require("./scrapper");
const sendMailAlert = require("../controller/nodemailer");

const cronJob = async () => {
  // find the whole document ana traverse if
  try {
    const doc = await User.find({});
    // Go through each object
    // scrape each url and if current price is less than target user price
    // put that into the notification
    // Task ,, finding document and updating document
    if (doc.length !== 0) {
      for (let i = 0; i < doc.length; i++) {
        const changeIndex = [];
        const updatedPrice = [];
        const dataItem = doc[i]["Data"]; // Data array of doc
        const newDoc = await User.findById(doc[i]["_id"]);
        const id = doc[i]["_id"]; // Document id
        // check whether notified  is true or not
        const count = doc[i]["notificationCount"];

        for (let j = 0; j < dataItem.length; j++) {
          const notified = Boolean(dataItem[j]["notified"]);
          const trackingPrice = dataItem[j]["target_price"]; // Target Price
          const priceDroped = Boolean(dataItem[j]["pricedrop"]); // Price drop value (True or False )
          try {
            const currentPrice = await scraper(dataItem[j]["url"]); // Current price from server
          } catch (error) {
            console.log(error);
          }
          const currentPrice = await scraper(dataItem[j]["url"]); // Current price from server
          // console.log(dataItem[j]["url"], currentPrice);
          const trackingId = dataItem[j]["_id"]; // _id of the current document
          if (currentPrice !== undefined) {
            if (!notified && !priceDroped && currentPrice !== undefined) {
              if (Number(currentPrice[2]) < Number(trackingPrice)) {
                changeIndex.push(j);
                updatedPrice.push(Number(currentPrice[2]));
              } else {
                if (
                  !Array.from(newDoc["Data"][j]["current_price"]).includes(
                    Number(currentPrice[2])
                  )
                ) {
                  newDoc["Data"][j]["current_price"].push(
                    Number(currentPrice[2])
                  );
                  newDoc["Data"][j]["dateArray"].push(
                    new Date(Date.now()).toDateString()
                  );

                  await newDoc.save();
                }
              }
            }
          }
        }

        if (changeIndex.length !== 0) {
          newDoc["notificationCount"] =
            Number(newDoc["notificationCount"]) + changeIndex.length;
          for (let k = 0; k < changeIndex.length; k++) {
            newDoc["Data"][changeIndex[k]]["pricedrop"] = true;
            newDoc["Data"][changeIndex[k]]["current_price"].push(
              updatedPrice[k]
            );
            newDoc["Data"][changeIndex[k]]["dateArray"].push(
              new Date(Date.now()).toDateString()
            );
            sendMailAlert(
              newDoc["email"],
              newDoc["Data"][changeIndex[k]]["title"],
              newDoc["name"]
            );
            newDoc["Data"][changeIndex[k]]["notified"] = true;
            await newDoc.save();
          }
        }
      }
    }
  } catch (error) {
    console.log(error.message, error.stack);
  }
};

module.exports = { cronJob };
