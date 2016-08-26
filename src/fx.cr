require "kemal"
require "json"
require "./process_data.cr"

cachedData = ""
connected = 0

def update_data
  # response = HTTP::Client.get "localhost:3000/rates.csv"
  response = HTTP::Client.get "http://webrates.truefx.com/rates/connect.html?f=csv"
  return ProcessData.process_data(response)
end

get "/" do
  render "public/index.ecr"
end

ws "/" do |socket|

  puts "Started!"
  cachedData = update_data
  connected = connected + 1
  socket.send cachedData
    
  spawn do
    while true
      sleep 5
      cachedData = update_data
      socket.send cachedData
    end
  end

  socket.on_close do
    puts "Closing socket"
    connected = connected - 1
  end

end

Kemal.run
