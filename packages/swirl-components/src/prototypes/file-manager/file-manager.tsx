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

  private layout: HTMLFlipAppLayoutElement;

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
        <flip-resource-list-item
          description={item.description}
          key={item.name}
          label={item.name}
          media={
            "type" in item
              ? "<flip-icon-file></flip-icon-file>"
              : "<flip-icon-folder-shared></flip-icon-folder-shared>"
          }
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => this.selectItem(item)}
        ></flip-resource-list-item>
      ))
    ) : (
      <flip-box padding="16">
        <flip-text color="subdued" weight="medium">
          This directory is empty.
        </flip-text>
      </flip-box>
    );
  }

  render() {
    return (
      <Host>
        <flip-app-layout
          appName="Documents"
          backToNavigationViewButtonLabel="Back to documents list"
          ctaIcon="<flip-icon-add></flip-icon-add>"
          ctaLabel="Upload file"
          heading={this.selectedFile?.name}
          navigationLabel="Documents"
          onNavigationBackButtonClick={this.resetSelectedDirectory}
          ref={(el) => (this.layout = el)}
          sidebarCloseButtonLabel="Close file info"
          sidebarHeading="File info"
          showNavigationBackButton={Boolean(this.selectedDirectory)}
          subheading={this.selectedFile?.description}
        >
          {/* Navigation */}
          <flip-resource-list label="Documents" slot="navigation">
            {this.renderNavigation()}
          </flip-resource-list>

          {/* Navigation controls */}
          <flip-button
            id="sort-button"
            label="Sort items"
            slot="navigation-controls"
          ></flip-button>

          {/* Content */}
          {Boolean(this.selectedFile) ? (
            <flip-file-viewer
              file={this.selectedFile.url}
              slot="content"
              type={this.selectedFile.type}
            ></flip-file-viewer>
          ) : (
            <flip-box
              cover
              centerBlock
              centerInline
              padding="16"
              slot="content"
            >
              <flip-empty-state
                heading="Nothing to see here."
                illustration="/images/empty-state-1.svg"
              >
                Please select a file from the list.
              </flip-empty-state>
            </flip-box>
          )}

          {/* App bar controls */}
          <div slot="app-bar-controls">
            {this.selectedFile && (
              <flip-button
                hide-label
                class="info-button"
                icon="<flip-icon-info></flip-icon-info>"
                label="Open file info"
                onClick={this.toggleSidebar}
              ></flip-button>
            )}
          </div>

          {/* Sidebar */}
          <flip-box padding="16" slot="sidebar">
            <flip-text color="subdued" weight="medium">
              File info goes here …
            </flip-text>
          </flip-box>
        </flip-app-layout>

        <flip-popover
          label="Sort items"
          popoverId="sort-menu"
          trigger="sort-button"
        >
          <flip-option-list value={["ascending"]}>
            <flip-option-list-item
              icon="<flip-icon-expand-less></flip-icon-expand-less>"
              label="Ascending"
              value="ascending"
            ></flip-option-list-item>
            <flip-option-list-item
              icon="<flip-icon-expand-more></flip-icon-expand-more>"
              label="Descending"
              value="descending"
            ></flip-option-list-item>
            <flip-option-list-item
              icon="<flip-icon-time-outlined></flip-icon-time-outlined>"
              label="By date"
              value="date"
            ></flip-option-list-item>
          </flip-option-list>
        </flip-popover>
      </Host>
    );
  }
}
