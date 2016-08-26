require "json"

module ProcessData

  extend self

  class Rate
    def initialize(
      @currencyPair : String, 
      @timestamp : String, 
      @bidBig : String, 
      @bidPips : String, 
      @offerBig : String, 
      @offerPips : String, 
      @high : String, 
      @low : String, 
      @open : String
    )
    end
    JSON.mapping(
      currencyPair: String,
      timestamp: String,
      bidBig: String,
      bidPips: String,
      offerBig: String,
      offerPips: String,
      high: String,
      low: String,
      open: String
    )
    def Rate.create(item)
      return Rate.new(
        item[0],
        item[1],
        item[2],
        item[3],
        item[4],
        item[5],
        item[6],
        item[7],
        item[8].rstrip
      )
    end
  end

  def process_data(response)
    # .filter(obj => obj.hasOwnProperty(valid))

    rates = [] of Rate
    response.body.lines.each do |line|
      item = line.split(",")
      if item.size > 1
        r = Rate.create(item)
        rates.push r
      end
    end
    return rates.to_json

  end

end
