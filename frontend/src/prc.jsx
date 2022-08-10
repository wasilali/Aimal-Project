<div className="wrappers fadeInDown">
    <div id="formContent">
      {/* Tabs Titles */}
      {/* Icon */}
      <div className="fadeIn first">
        <img
          src="https://img.pikbest.com/png-images/simple-modern-unique-tropical-beach-logo--the-symbol-itself-will-look-nice-as-social-media_5667070.png!bw340"
          id="icon"
          alt="User Icon"
        />
      </div>
      {/* Login Form */}
      <form onSubmit={data.handleSubmit(saveUser)}>
        <input
          {...data.register("email", {required:true})}
          type="text"
          id="login"
          className="fadeIn second"          
          placeholder="login"
        />
        
       {data.formState.errors.name ? <div className='error'>Please enter your name</div> :null }
        
        
        
        <input
          type="text"
          id="password"
          className="fadeIn third"
          {...data.register("password", {required:true})}
          placeholder="password"
        />
        
        { data.formState.errors.password && data.formState.errors.password.type == "required" ? <div className='error'>Please enter your pasword</div> : null}
        { data.formState.errors.password && data.formState.errors.password.type == "minLength" ? <div className='error'>Please enter atleast 6 characters</div> : null}
        { data.formState.errors.password && data.formState.errors.password.type == "validate" ? <div className='error'>Please enter atleast 1 Capital letter, 1 Small letter and 1 special lettr</div> : null}

        <input type="submit" className="fadeIn fourth" defaultValue="Log In" />
      </form>
      {/* Remind Passowrd */}
      <div id="formFooter">
        <a className="underlineHover" href="#">
          Forgot Password?
        </a>
      </div>
    </div>
  </div>