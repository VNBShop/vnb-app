import * as React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HrVertical from '../../components/hrVertical';
import {fakeData} from '../../utils/contants';
import {common, flex} from '../../UIkit/styles';
import OrHr from '../../components/or-hr';
import {color} from '../../UIkit/palette';
import Tag from '../../components/tag';
import {pen} from '../../assets';

export default function Order() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.orderItem}>
          <Tag
            content="Order success"
            textColor={color.success}
            backGroundColor={color.successPastel}
          />
          {fakeData.map((item, index) => {
            return (
              index < 3 && (
                <View key={item.id}>
                  <View style={styles.productItem}>
                    <Image source={item.image} style={styles.productImg} />

                    <View style={styles.productInfo}>
                      <Text>{item.name}</Text>

                      <View style={styles.productPrice}>
                        <Text style={common.text_gray}>Quantity: 1</Text>
                        <HrVertical />
                        <Text style={common.text_gray}>{item.price}</Text>
                      </View>

                      <View style={flex.between}>
                        <Text>Yonex</Text>
                        <TouchableOpacity style={styles.editContainer}>
                          <Image source={pen} style={styles.editIcon} />
                          <Text style={common.text_link}>Review</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <OrHr />
                </View>
              )
            );
          })}

          <View style={styles.orderFooter}>
            <TouchableOpacity style={styles.footerBtn}>
              <Text>View detail</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.footerBtn, styles.btnR]}>
              <Text style={styles.textBtnR}>Redeem</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.orderItem}>
          <Tag
            content="Order faild"
            textColor={color.danger}
            backGroundColor={color.dangerPastel}
          />
          {fakeData.map((item, index) => {
            return (
              index < 3 && (
                <View key={item.id}>
                  <View style={styles.productItem}>
                    <Image source={item.image} style={styles.productImg} />

                    <View style={styles.productInfo}>
                      <Text>{item.name}</Text>

                      <View style={styles.productPrice}>
                        <Text style={common.text_gray}>Quantity: 1</Text>
                        <HrVertical />
                        <Text style={common.text_gray}>{item.price}</Text>
                      </View>

                      <View style={flex.between}>
                        <Text>Yonex</Text>
                        <TouchableOpacity style={styles.editContainer}>
                          <Image source={pen} style={styles.editIcon} />
                          <Text style={common.text_link}>Review</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <OrHr />
                </View>
              )
            );
          })}

          <View style={styles.orderFooter}>
            <TouchableOpacity style={styles.footerBtn}>
              <Text>View detail</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.footerBtn, styles.btnR]}>
              <Text style={styles.textBtnR}>Redeem</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.end}>End of reached</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  scrollContainer: {
    gap: 16,
  },
  orderItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    gap: 16,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  footerBtn: {
    flexGrow: 1,
    padding: 8,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnR: {
    backgroundColor: color.primary,
  },
  textBtnR: {
    color: '#ffffff',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingBottom: 16,
  },
  productInfo: {
    gap: 8,
    flex: 1,
  },
  productImg: {
    width: 70,
    height: 70,
  },
  productPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  end: {
    alignSelf: 'center',
    paddingVertical: 32,
    color: color.gray,
  },
});
