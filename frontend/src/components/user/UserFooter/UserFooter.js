import React from 'react';

function UserFooter() {
  return (
    <footer className="bg-light text-center text-lg-start">
      <div className="text-center p-4" style={{ backgroundColor: '#424242' }}>
        <p className="text-white mb-0">
          © {new Date().getFullYear()} New.com. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default UserFooter;
