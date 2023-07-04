import clsx from 'clsx';
import { memo, useContext, useState } from 'react';
import useBreadcrumbs, { BreadcrumbsRoute } from 'use-react-router-breadcrumbs';

import { useLocation } from 'react-router-dom';
import { ReactComponent as IconLogoutActive } from '../assets/icons/icon-logout-active.svg';
import { ReactComponent as IconLogout } from '../assets/icons/icon-logout.svg';

import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';
import Copyright from './components/Copyright/Copyright';
import MobileControlsPanel from './components/MobileControlsPanel/MobileControlsPanel';
import SidebarItem from './components/Sidebar/components/SidebarItem/SidebarItem';
import Sidebar from './components/Sidebar/Sidebar';
import TemplatePages from './components/TemplatePages/TemplatePages';

import { useSidebarRoutes } from './hooks/useSidebarRoutes';

import { getAdminRoutes, getSidebarRoutes } from '../routes/adminRoutes';
import AccessBasedOnPemissionsStateContext from '../routes/state/AccessBasedOnPemissionsStateContext';
// import BarcodeScanner from '../components/BarcodeScanner/BarcodeScanner';
import Html5QrcodePlugin from '../components/BarcodeScanner/Html5QrcodeScannerPlugin';
import { ReactZxing } from '../components/BarcodeScanner/ReactZxing';

function Template() {
  const location = useLocation();

  const accessBasedOnPemissionsState = useContext(AccessBasedOnPemissionsStateContext);

  const parsedSidebarRoutes = useSidebarRoutes(getSidebarRoutes(accessBasedOnPemissionsState.accessPermissions), location);
  const adminRoutes = getAdminRoutes(accessBasedOnPemissionsState.accessPermissions);

  const breadcrumbs = useBreadcrumbs(adminRoutes as BreadcrumbsRoute<string>[], { excludePaths: ['/'] });

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpened, setIsMobileSidebarOpened] = useState(false);

  const prevBreadcrumbPath = breadcrumbs.length > 1
    ? breadcrumbs[breadcrumbs.length - 2].key
    : null;

  const [result, setResult] = useState<any>('');

  const onNewScanResult = (decodedText: any, decodedResult:any) => {
    // handle decoded results here
    console.log('HTML5 scanner decodedText', decodedText);
    console.log('HTML5 scanner decodedResult', decodedResult);
    setResult(decodedText);
  };

  return (
    <>
      <div
        className={clsx('template', {
          'template--sidebar-collapsed': isSidebarCollapsed,
        })}
      >
        <div className="template__sidebar">
          <Sidebar
            infoBoxData={{}}
            menuData={parsedSidebarRoutes}
            isCollapsed={isSidebarCollapsed}
            isMobileOpened={isMobileSidebarOpened}
            onCollapseToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            onOverlayClick={() => setIsMobileSidebarOpened(false)}
            onMenuLinkClick={() => setIsMobileSidebarOpened(false)}
            renderBottomComponent={() => (

              <SidebarItem
                className="template__logout"
                icon={<IconLogout />}
                iconActive={<IconLogoutActive />}
                isWindowRedirectNecessary
                path="/auth/logout"
                label="LogOut"
              />
            )}
          />
        </div>

        <div className="template__main">
          <div className="template__panel template__panel--top">
            <Breadcrumbs list={breadcrumbs} />
          </div>
          <Html5QrcodePlugin
            fps={10}
            qrbox={700}
            disableFlip={false}
            qrCodeSuccessCallback={onNewScanResult}
          />
          <div>
            Html5QrcodePlugin:
            {' '}
            {result}
          </div>
          {/* <div>BarcodeScanner Xzing</div>
          <BarcodeScanner /> */}
          <ReactZxing />

          <div className="template__content">
            <TemplatePages routes={adminRoutes} />
          </div>

          <div className="template__panel template__panel--bottom">
            <Copyright />
          </div>
        </div>
      </div>

      <MobileControlsPanel
        homePath="/analytics"
        homePageName="Analytics"
        prevPath={prevBreadcrumbPath}
        isToggled={isMobileSidebarOpened}
        onToggleClick={() => setIsMobileSidebarOpened(!isMobileSidebarOpened)}
      />
    </>
  );
}

export default memo(Template);
