import { newSpecPage } from "@stencil/core/testing";

import { SwirlTreeViewItem } from "../swirl-tree-view-item/swirl-tree-view-item";
import { SwirlTreeView } from "./swirl-tree-view";

xdescribe("swirl-tree-view", () => {
  it("renders children", async () => {
    const page = await newSpecPage({
      components: [SwirlTreeView, SwirlTreeViewItem],
      html: `
        <swirl-tree-view label="Label">
          <swirl-tree-view-item href="#" icon="🪁" id="item-1" label="Item 1">
            <swirl-tree-view-item href="#" icon="🍄" id="item-2" label="Item 1.1"></swirl-tree-view-item>
            <swirl-tree-view-item href="#" icon="🌎" id="item-3" label="Item 1.2">
              <swirl-tree-view-item href="#" icon="❄️" id="item-4" label="Item 1.2.1"></swirl-tree-view-item>
              <swirl-tree-view-item href="#" icon="🌭" id="item-5" label="Item 1.2.2"></swirl-tree-view-item>
            </swirl-tree-view-item>
            <swirl-tree-view-item href="#" icon="🎾" id="item-6" label="Item 1.3"></swirl-tree-view-item>
          </swirl-tree-view-item>
          <swirl-tree-view-item href="#" icon="🎷" id="item-7" label="Item 2">
            <swirl-tag bordered id="item-2" label="Draft" size="s" slot="tags"></swirl-tag>
          </swirl-tree-view-item>
          <swirl-tree-view-item href="#" icon="🎮" id="item-8" label="Item 3">
            <swirl-tree-view-item href="#" icon="💈" id="item-9" label="Item 3.1"></swirl-tree-view-item>
          </swirl-tree-view-item>
        </swirl-tree-view>
      `,
    });

    expect(page.root).toMatchInlineSnapshot(`
      <swirl-tree-view label="Label">
        <!---->
        <ul aria-label="Label" class="tree-view" role="tree" tabindex="-1">
          <swirl-tree-view-item href="#" icon="🪁" label="Item 1" role="none">
            <!---->
            <li class="tree-view-item" role="none">
              <a aria-expanded="false" aria-level="1" aria-owns="undefined-children" aria-selected="true" class="tree-view-item__link" href="#" role="treeitem" tabindex="0">
                <span class="tree-view-item__toggle-icon">
                  <swirl-icon-chevron-right size="24"></swirl-icon-chevron-right>
                </span>
                <span class="tree-view-item__icon">
                  🪁
                </span>
                <span class="tree-view-item__label">
                  Item 1
                </span>
                <span class="tree-view-item__tags"></span>
              </a>
              <ul aria-label="Item 1" class="tree-view-item__children" id="undefined-children" role="group" style="display: none;">
                <swirl-tree-view-item href="#" icon="🍄" id="item-2" label="Item 1.1" role="none">
                  <!---->
                  <li class="tree-view-item" role="none">
                    <a aria-level="2" aria-selected="false" class="tree-view-item__link" href="#" role="treeitem" tabindex="-1">
                      <span class="tree-view-item__toggle-icon"></span>
                      <span class="tree-view-item__icon">
                        🍄
                      </span>
                      <span class="tree-view-item__label">
                        Item 1.1
                      </span>
                      <span class="tree-view-item__tags"></span>
                    </a>
                    <ul aria-label="Item 1.1" class="tree-view-item__children" id="undefined-children" role="group" style="display: none;"></ul>
                  </li>
                </swirl-tree-view-item>
                <swirl-tree-view-item href="#" icon="🌎" id="item-3" label="Item 1.2" role="none">
                  <!---->
                  <li class="tree-view-item" role="none">
                    <a aria-expanded="false" aria-level="2" aria-owns="undefined-children" aria-selected="false" class="tree-view-item__link" href="#" role="treeitem" tabindex="-1">
                      <span class="tree-view-item__toggle-icon">
                        <swirl-icon-chevron-right size="24"></swirl-icon-chevron-right>
                      </span>
                      <span class="tree-view-item__icon">
                        🌎
                      </span>
                      <span class="tree-view-item__label">
                        Item 1.2
                      </span>
                      <span class="tree-view-item__tags"></span>
                    </a>
                    <ul aria-label="Item 1.2" class="tree-view-item__children" id="undefined-children" role="group" style="display: none;">
                      <swirl-tree-view-item href="#" icon="❄️" id="item-4" label="Item 1.2.1" role="none">
                        <!---->
                        <li class="tree-view-item" role="none">
                          <a aria-level="3" aria-selected="false" class="tree-view-item__link" href="#" role="treeitem" tabindex="-1">
                            <span class="tree-view-item__toggle-icon"></span>
                            <span class="tree-view-item__icon">
                              ❄️
                            </span>
                            <span class="tree-view-item__label">
                              Item 1.2.1
                            </span>
                            <span class="tree-view-item__tags"></span>
                          </a>
                          <ul aria-label="Item 1.2.1" class="tree-view-item__children" id="undefined-children" role="group" style="display: none;"></ul>
                        </li>
                      </swirl-tree-view-item>
                      <swirl-tree-view-item href="#" icon="🌭" id="item-5" label="Item 1.2.2" role="none">
                        <!---->
                        <li class="tree-view-item" role="none">
                          <a aria-level="3" aria-selected="false" class="tree-view-item__link" href="#" role="treeitem" tabindex="-1">
                            <span class="tree-view-item__toggle-icon"></span>
                            <span class="tree-view-item__icon">
                              🌭
                            </span>
                            <span class="tree-view-item__label">
                              Item 1.2.2
                            </span>
                            <span class="tree-view-item__tags"></span>
                          </a>
                          <ul aria-label="Item 1.2.2" class="tree-view-item__children" id="undefined-children" role="group" style="display: none;"></ul>
                        </li>
                      </swirl-tree-view-item>
                    </ul>
                  </li>
                </swirl-tree-view-item>
                <swirl-tree-view-item href="#" icon="🎾" id="item-6" label="Item 1.3" role="none">
                  <!---->
                  <li class="tree-view-item" role="none">
                    <a aria-level="2" aria-selected="false" class="tree-view-item__link" href="#" role="treeitem" tabindex="-1">
                      <span class="tree-view-item__toggle-icon"></span>
                      <span class="tree-view-item__icon">
                        🎾
                      </span>
                      <span class="tree-view-item__label">
                        Item 1.3
                      </span>
                      <span class="tree-view-item__tags"></span>
                    </a>
                    <ul aria-label="Item 1.3" class="tree-view-item__children" id="undefined-children" role="group" style="display: none;"></ul>
                  </li>
                </swirl-tree-view-item>
              </ul>
            </li>
          </swirl-tree-view-item>
          <swirl-tree-view-item href="#" icon="🎷" id="item-7" label="Item 2" role="none">
            <!---->
            <li class="tree-view-item tree-view-item--has-tags" role="none">
              <a aria-level="1" aria-selected="false" class="tree-view-item__link" href="#" role="treeitem" tabindex="-1">
                <span class="tree-view-item__toggle-icon"></span>
                <span class="tree-view-item__icon">
                  🎷
                </span>
                <span class="tree-view-item__label">
                  Item 2
                </span>
                <span class="tree-view-item__tags">
                  <swirl-tag bordered="" id="item-2" label="Draft" size="s" slot="tags"></swirl-tag>
                </span>
              </a>
              <ul aria-label="Item 2" class="tree-view-item__children" id="undefined-children" role="group" style="display: none;">
              </ul>
            </li>
          </swirl-tree-view-item>
          <swirl-tree-view-item href="#" icon="🎮" id="item-8" label="Item 3" role="none">
            <!---->
            <li class="tree-view-item" role="none">
              <a aria-expanded="false" aria-level="1" aria-owns="undefined-children" aria-selected="false" class="tree-view-item__link" href="#" role="treeitem" tabindex="-1">
                <span class="tree-view-item__toggle-icon">
                  <swirl-icon-chevron-right size="24"></swirl-icon-chevron-right>
                </span>
                <span class="tree-view-item__icon">
                  🎮
                </span>
                <span class="tree-view-item__label">
                  Item 3
                </span>
                <span class="tree-view-item__tags"></span>
              </a>
              <ul aria-label="Item 3" class="tree-view-item__children" id="undefined-children" role="group" style="display: none;">
                <swirl-tree-view-item href="#" icon="💈" id="item-9" label="Item 3.1" role="none">
                  <!---->
                  <li class="tree-view-item" role="none">
                    <a aria-level="2" aria-selected="false" class="tree-view-item__link" href="#" role="treeitem" tabindex="-1">
                      <span class="tree-view-item__toggle-icon"></span>
                      <span class="tree-view-item__icon">
                        💈
                      </span>
                      <span class="tree-view-item__label">
                        Item 3.1
                      </span>
                      <span class="tree-view-item__tags"></span>
                    </a>
                    <ul aria-label="Item 3.1" class="tree-view-item__children" id="undefined-children" role="group" style="display: none;"></ul>
                  </li>
                </swirl-tree-view-item>
              </ul>
            </li>
          </swirl-tree-view-item>
        </ul>
      </swirl-tree-view>
    `);
  });
});
