import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";
import {
    useRef,
    forwardRef,
    useImperativeHandle,
    ForwardRefRenderFunction,
} from "react";

import "react-spring-bottom-sheet/dist/style.css";

interface Props {
    header?: React.ReactNode;
    children: React.ReactNode;
}

export interface ChildHandles {
    fullOpen(): void;
}

const BtmSheetComponent: ForwardRefRenderFunction<ChildHandles, Props> = (
    props,
    ref
) => {
    // ボトムシートの参照
    const sheetRef = useRef<BottomSheetRef>(null);

    // useImperativeHandleを使用することで、親コンポーネントから子コンポーネントのメソッドを呼び出せるようにする
    useImperativeHandle(ref, () => ({
        fullOpen() {
            sheetRef.current?.snapTo(({ snapPoints }) => Math.max(...snapPoints));
        },
    }));
    return (
        <>
            <BottomSheet
                open
                ref={sheetRef}
                className="text-white"
                // ボトムシートをドラッグしたとき変更できる高さの範囲
                snapPoints={({ minHeight, headerHeight }) => [
                    // 最小の高さ
                    headerHeight,
                    // 最大の高さ
                    minHeight,
                ]}
                // オーバーレイを削除して後ろの要素をクリックできるようにする
                blocking={false}
                // ボトムシートのヘッダー部分
                header={props.header}
                skipInitialTransition
            >
                <div
                    className="mr-4 ml-4 mb-4"
                >
                    {props.children}
                </div>
            </BottomSheet>
        </>
    );
};
export const BtmSheet = forwardRef(BtmSheetComponent);
