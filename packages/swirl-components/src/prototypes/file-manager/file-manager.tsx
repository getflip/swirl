import { Component, h, Host, State } from "@stencil/core";

type FileManagerDirectory = {
  children: (FileManagerDirectory | FileManagerFile)[];
  description: string;
  name: string;
};

type FileManagerFile = {
  description: string;
  name: string;
  type: string;
  url: string;
};

const FileManagerMockData: { directories: FileManagerDirectory[] } = {
  directories: [
    {
      name: "Development",
      description: "Updated 2 days ago.",
      children: [
        {
          description: "1.02 MB, updated 2 days ago.",
          name: "sample.pdf",
          type: "application/pdf",
          url: "/sample.pdf",
        },
        {
          description: "124 KB, updated a month ago.",
          name: "sample.jpg",
          type: "image/jpeg",
          url: "/sample.jpg",
        },
      ],
    },
    {
      name: "People",
      description: "Updated just now.",
      children: [],
    },
  ],
};

@Component({
  shadow: true,
  tag: "file-manager",
})
export class FileManager {
  @State() selectedDirectory: FileManagerDirectory | undefined;
  @State() selectedFile: FileManagerFile | undefined;

  private layout: HTMLSwirlAppLayoutElement;

  private selectItem = (item: FileManagerDirectory | FileManagerFile) => {
    if ("type" in item) {
      this.selectedFile = item;
      this.layout.changeMobileView("body");
    } else {
      this.selectedDirectory = item;
    }
  };

  private resetSelectedDirectory = () => {
    this.selectedDirectory = undefined;
  };

  private toggleSidebar = () => {
    this.layout?.toggleSidebar();
  };

  private renderNavigation() {
    const items = Boolean(this.selectedDirectory)
      ? this.selectedDirectory.children
      : FileManagerMockData.directories;

    return items.length > 0 ? (
      items.map((item) => (
        <swirl-resource-list-item
          description={item.description}
          key={item.name}
          label={item.name}
          media={
            "type" in item
              ? "<swirl-icon-file></swirl-icon-file>"
              : "<swirl-icon-folder-shared></swirl-icon-folder-shared>"
          }
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => this.selectItem(item)}
        ></swirl-resource-list-item>
      ))
    ) : (
      <swirl-box padding="16">
        <swirl-text color="subdued" weight="medium">
          This directory is empty.
        </swirl-text>
      </swirl-box>
    );
  }

  render() {
    return (
      <Host>
        <swirl-app-layout
          appName="Documents"
          backToNavigationViewButtonLabel="Back to documents list"
          ctaIcon="<swirl-icon-add></swirl-icon-add>"
          ctaLabel="Upload file"
          heading={this.selectedFile?.name}
          navigationLabel="Documents"
          onNavigationBackButtonClick={this.resetSelectedDirectory}
          ref={(el) => (this.layout = el)}
          sidebarCloseButtonLabel="Close file info"
          sidebarHeading="File info"
          showNavigationBackButton={Boolean(this.selectedDirectory)}
          subheading={this.selectedFile?.description}
          transitionStyle="dialog"
        >
          {/* Navigation */}
          <swirl-resource-list label="Documents" slot="navigation">
            {this.renderNavigation()}
          </swirl-resource-list>

          {/* Navigation controls */}
          <swirl-button
            id="sort-button"
            label="Sort items"
            slot="navigation-controls"
          ></swirl-button>

          {/* Content */}
          {Boolean(this.selectedFile) ? (
            <swirl-file-viewer
              file={this.selectedFile.url}
              slot="content"
              type={this.selectedFile.type}
            ></swirl-file-viewer>
          ) : (
            <swirl-box
              cover
              centerBlock
              centerInline
              padding="16"
              slot="content"
            >
              <swirl-empty-state
                heading="Nothing to see here."
                illustration="/images/empty-state-1.svg"
              >
                Please select a file from the list.
              </swirl-empty-state>
            </swirl-box>
          )}

          {/* App bar controls */}
          <div slot="app-bar-controls">
            {this.selectedFile && (
              <swirl-button
                hide-label
                class="info-button"
                icon="<swirl-icon-info></swirl-icon-info>"
                label="Open file info"
                onClick={this.toggleSidebar}
              ></swirl-button>
            )}
          </div>

          {/* Sidebar */}
          <swirl-box padding="16" slot="sidebar">
            <swirl-text color="subdued" weight="medium">
              File info goes here …
            </swirl-text>
          </swirl-box>
        </swirl-app-layout>

        <swirl-popover
          label="Sort items"
          popoverId="sort-menu"
          trigger="sort-button"
        >
          <swirl-option-list value={["ascending"]}>
            <swirl-option-list-item
              icon="<swirl-icon-expand-less></swirl-icon-expand-less>"
              label="Ascending"
              value="ascending"
            ></swirl-option-list-item>
            <swirl-option-list-item
              icon="<swirl-icon-expand-more></swirl-icon-expand-more>"
              label="Descending"
              value="descending"
            ></swirl-option-list-item>
            <swirl-option-list-item
              icon="<swirl-icon-time-outlined></swirl-icon-time-outlined>"
              label="By date"
              value="date"
            ></swirl-option-list-item>
          </swirl-option-list>
        </swirl-popover>
      </Host>
    );
  }
}
