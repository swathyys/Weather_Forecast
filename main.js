function GetInfo() {
    var newName = document.getElementById("cityInput").value;
    var cityName = document.getElementById("cityName");
    cityName.innerHTML = "[" + newName + "]";

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${newName}&units=metric&appid=1c2185669715d617ded2ac3ce58f5df7`)
        .then(response => response.json())
        .then(data => {
            // Ensure we have enough data to cover 5 days
            if (data.list.length < 40) {
                alert("Not enough data available for 5-day forecast.");
                return;
            }

            // Getting the min and max values for each day
            for (let i = 0; i < 5; i++) {
                let dailyData = data.list.slice(i * 8, i * 8 + 8); // 8 data points per day
                let minTemp = Math.min(...dailyData.map(item => item.main.temp_min));
                let maxTemp = Math.max(...dailyData.map(item => item.main.temp_max));

                document.getElementById("day" + (i + 1) + "Min").innerHTML = "Min: " + minTemp.toFixed(1) + "°C";
                document.getElementById("day" + (i + 1) + "Max").innerHTML = "Max: " + maxTemp.toFixed(1) + "°C";

                // Getting Weather Icons
                document.getElementById("img" + (i + 1)).src = "https://openweathermap.org/img/wn/" +
                    dailyData[0].weather[0].icon + ".png";
            }
        })
        .catch(err => alert("Something Went Wrong: Try Checking Your Internet Connection"));
}

function DefaultScreen() {
    document.getElementById("cityInput").defaultValue = "London";
    GetInfo();
}

// Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Function to get the correct integer for the index of the days array
function CheckDay(day) {
    if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
    } else {
        return day + d.getDay();
    }
}

for (let i = 0; i < 5; i++) {
    document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
}
