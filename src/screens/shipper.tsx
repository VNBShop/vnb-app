/* eslint-disable react-native/no-inline-styles */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useQueryClient} from '@tanstack/react-query';
import * as React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStackProps} from '../../types/route';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {common, flex} from '../UIkit/styles';
import useAuth from '../_store/useAuth';
import {cat, changepass} from '../assets';
import OrderedSkeleton from '../components/skeleton/ordered-skeleton';
import Box from '../components/ui/box';
import HrVertical from '../components/ui/hrVertical';
import {Icon} from '../components/ui/icon';
import OrHr from '../components/ui/or-hr';
import Tag from '../components/ui/tag';
import useChangeStatusOrder, {
  ChangeStatusOrder,
} from '../hooks/order/useChangeStatusOrder';
import useFetchOrderShipper from '../hooks/order/useFetchOrderShipper';
import {useDebounce} from '../hooks/useDebounce';
import {colorsOrderedStatus, orderedStatusOption} from '../libs/contants';

type IProps = NativeStackScreenProps<RootStackProps, 'Shipper'>;

export default function ShipperScreen({navigation}: IProps) {
  const {logout, data: user} = useAuth();

  const insets = useSafeAreaInsets();

  const refAction = React.useRef<Modalize>();

  const client = useQueryClient();

  const [search, setSearch] = React.useState('');

  const searchVal = useDebounce(search, 1300);

  const {loading, orders} = useFetchOrderShipper({
    phone: searchVal,
  });

  const [payload, setPayload] = React.useState<ChangeStatusOrder>(
    {} as ChangeStatusOrder,
  );

  const onOpenAction = (
    values: Pick<ChangeStatusOrder, 'orderId' | 'orderStatus'>,
  ) => {
    setPayload({
      ...values,
      search: search,
    });
    !!refAction?.current && refAction.current?.open();
  };

  const onCloseAction = () => {
    !!refAction?.current && refAction.current?.close();
  };

  const {loadingChange, onChangeStatusOrder} = useChangeStatusOrder({
    onSuccess: onCloseAction,
  });

  React.useEffect(() => {
    if (!search) {
      client.cancelQueries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <>
      <SafeArea>
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={logout}>
            <Text style={{color: color.danger}}>Logout</Text>
          </TouchableOpacity>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon icon={cat} size={25} />

            <Text style={{fontSize: 16}}>
              Hi,{' '}
              {!!user?.firstName || !!user?.lastName
                ? `${user?.firstName} ${user?.lastName}`
                : user?.email}
            </Text>
          </View>

          <Icon
            icon={changepass}
            onPress={() => navigation.navigate('ChangePassword')}
            size={25}
            style={{marginLeft: 20}}
          />
        </View>

        <ScrollView
          style={{
            paddingHorizontal: 20,
            marginTop: 20,
          }}>
          <TextInput
            placeholderTextColor={color.gray}
            value={search}
            onChangeText={setSearch}
            autoFocus
            style={{
              borderRadius: 9999,
              paddingHorizontal: 16,
              height: 42,
              backgroundColor: color.divider,
            }}
            placeholder="Search order"
          />

          {!orders?.length && loading && (
            <View
              style={{
                marginTop: 16,
                gap: 16,
              }}>
              <OrderedSkeleton />
            </View>
          )}

          {!!orders?.length && (
            <View
              style={{
                marginTop: 16,
                gap: 16,
              }}>
              {orders.map(item => (
                <View style={styles.orderItem}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Tag
                      content={
                        orderedStatusOption.find(
                          o => o?.value === item?.orderStatus,
                        )?.label ?? ''
                      }
                      textColor={colorsOrderedStatus[item?.orderStatus]?.color}
                      backGroundColor={
                        colorsOrderedStatus[item?.orderStatus]?.backgroundColor
                      }
                    />

                    <Text style={common.text_gray}>
                      Order id:{item?.orderId}
                    </Text>
                  </View>
                  {item?.products?.map(prod => {
                    return (
                      <View key={prod?.productId}>
                        <View style={styles.productItem}>
                          <Image
                            source={{
                              uri: prod?.productImage ?? '',
                            }}
                            style={styles.productImg}
                          />

                          <View style={styles.productInfo}>
                            <Text>{prod?.productName}</Text>

                            <View style={styles.productPrice}>
                              {!!prod?.productSizeName && (
                                <View style={styles.tag}>
                                  <Text style={styles.tagText}>
                                    {prod.productSizeName}
                                  </Text>
                                </View>
                              )}
                              <HrVertical />
                              <Text style={common.text_gray}>
                                x{prod?.quantity}
                              </Text>
                            </View>

                            <View style={flex.between}>
                              <Text style={common.text_secondary}>
                                {prod?.priceUnit?.toLocaleString('vi-VI', {
                                  currency: 'VND',
                                  style: 'currency',
                                })}
                              </Text>
                            </View>
                          </View>
                        </View>

                        <OrHr />
                      </View>
                    );
                  })}

                  <View style={styles.orderFooter}>
                    <TouchableOpacity
                      style={styles.footerBtn}
                      onPress={() =>
                        onOpenAction({
                          orderId: item.orderId,
                          orderStatus: item?.orderStatus,
                        })
                      }>
                      <Text style={styles.textBtnR}>Change status</Text>
                    </TouchableOpacity>
                    <Box />
                  </View>
                </View>
              ))}
            </View>
          )}

          {!orders?.length && !loading && !!searchVal ? (
            <Text
              style={{
                marginTop: 100,
                textAlign: 'center',
                color: color.gray,
                fontSize: 15,
              }}>
              No order with this phone
            </Text>
          ) : (
            !orders?.length &&
            !loading && (
              <Text
                style={{
                  marginTop: 100,
                  textAlign: 'center',
                  color: color.gray,
                  fontSize: 15,
                }}>
                Enter phone number of customer to search order!
              </Text>
            )
          )}
        </ScrollView>
      </SafeArea>

      <Portal>
        <Modalize
          useNativeDriver
          panGestureEnabled
          closeOnOverlayTap={true}
          overlayStyle={{backgroundColor: 'rgba(255, 255, 255, 0)'}}
          modalStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0)',
          }}
          adjustToContentHeight
          FooterComponent={
            <View
              style={{
                marginHorizontal: 16,
              }}>
              <TouchableOpacity
                onPress={onCloseAction}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 50,
                  borderRadius: 8,
                  backgroundColor: '#ffffff',
                }}>
                <Text
                  style={{
                    color: color.danger,
                    fontSize: 17,
                    fontWeight: '500',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          }
          FloatingComponent={
            <View
              style={{
                height: insets.bottom,
              }}
            />
          }
          ref={refAction}>
          <View style={{marginHorizontal: 16, marginBottom: 8}}>
            <View style={{backgroundColor: '#ffffff', borderRadius: 8}}>
              {orderedStatusOption
                .filter(
                  item =>
                    item?.value !== 'PENDING' &&
                    item?.value !== 'CANCELLED' &&
                    item?.value !== payload?.orderStatus,
                )
                .map(item => (
                  <View key={item?.value}>
                    <TouchableOpacity
                      disabled={loadingChange}
                      onPress={() =>
                        onChangeStatusOrder({
                          orderId: payload?.orderId,
                          orderStatus: item.value,
                          search: search,
                        })
                      }
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 16,
                        flexDirection: 'row',
                        gap: 8,
                      }}>
                      {loadingChange &&
                        item?.value === payload?.orderStatus && (
                          <ActivityIndicator />
                        )}
                      <Text style={{fontSize: 18, color: color.link}}>
                        {item?.label}
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        width: '70%',
                        marginLeft: '30%',
                        height: 0.6,
                        backgroundColor: color.border_input,
                      }}
                    />
                  </View>
                ))}
            </View>
          </View>
        </Modalize>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  popupContent: {
    rowGap: 4,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: color.gray,
  },
  headerPopup: {
    padding: 16,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tag: {
    backgroundColor: '#e1e5fe',
    borderRadius: 4,
    padding: 4,
    paddingHorizontal: 12,
  },
  tagText: {
    color: '#4033a0',
  },
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  scrollContainer: {
    gap: 16,
  },
  orderItem: {
    backgroundColor: '#ffffff',
    gap: 16,
    marginBottom: 16,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
  footerBtn: {
    // flexGrow: 1,
    padding: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: color.success,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    flexDirection: 'row',
  },
  btnR: {
    backgroundColor: color.primary,
  },
  textBtnR: {
    color: color.success,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 16,
  },
  productInfo: {
    gap: 8,
    flex: 1,
  },
  productImg: {
    width: 100,
    height: 100,
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
  end: {
    alignSelf: 'center',
    paddingVertical: 32,
    color: color.gray,
  },
});
