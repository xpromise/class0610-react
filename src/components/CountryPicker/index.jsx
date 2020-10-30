import React, { Component } from "react";
import { List } from "antd-mobile";
import { reqCountryData } from "@api/common";

const Item = List.Item;

export default class CountryPicker extends Component {
  state = {
    countryData: {},
  };

  async componentDidMount() {
    const countryData = await reqCountryData();
    this.setState({
      countryData,
    });
  }

  render() {
    const { countryData } = this.state;

    /*
      {
        *: [{"赤道几内亚": "240"}],
        A: [{"赤道几内亚": "240"}]
      }
    */

    // 提取对象的所有属性名成为一个数组
    // ["*", "A", "B" ...]
    const countryDataKeys = Object.keys(countryData);

    return (
      <div>
        {countryDataKeys.map((key) => {
          return (
            <List renderHeader={() => key} key={key}>
              {countryData[key].map((item, index) => {
                // item {"赤道几内亚": "240"}
                const key = Object.keys(item)[0];
                const value = item[key];
                return (
                  <Item key={index} extra={value}>
                    {key}
                  </Item>
                );
              })}
            </List>
          );
        })}
      </div>
    );
  }
}
