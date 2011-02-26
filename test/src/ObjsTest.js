/**
 * @author   Frederic Saunier - www.tekool.net
 * @since    2006/02/08
 *
 * @classDescription
 * Test the Objs library methods.
 *
 * @license
 *
 * Copyright (C) 2006-2011 Frederic Saunier
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 *
 */

var ObjsTest = new YUITest.TestCase
(
	{
	    /**
	     * The name of the test case - if not provided, one is automatically
	     * generated by the YUITest framework.
	     * 
	     * @type {String}
	     * @private
	     */
	    name: "ObjsTest library tests",  

	    /**
	     * Sets up data that is needed by each test.
	     */
	    setUp: function(){},

	    /**
	     * Cleans up everything that was created by setUp().
	     */
	    tearDown: function(){},
		
		/**
		 * Tests Objs(classpath) parameter.
		 */
		testRetrieveInvalidClasspathParameter: function()
		{
			var expectedErrorMessage/*String*/ = "Invalid classpath: ";

			YUITest.Assert.throwsError
			(
				expectedErrorMessage + "null",
				function(){Objs(null)},
				"An error should have been thrown."
			);
					
			YUITest.Assert.throwsError
			(
				expectedErrorMessage + "undefined",
				function(){Objs(undefined)},
				"An error should have been thrown."
			);
			
			//Not a string
			YUITest.Assert.throwsError
			(
				expectedErrorMessage + "[object Object]",
				function(){Objs({})},
				"An error should have been thrown."
			);
		},

		/**
		 * Tests Objs(classpath) class constrcutor creation.
		 */
		testSimpleCreate: function()
		{
			var classpath/*String*/ = "com.website.myclasspath.TestAdd";
			var constructor/*Function*/ = Objs( classpath );
			
			YUITest.Assert.isInstanceOf
			(
				Function,
				constructor,
				"Expected constructor to be an instance of Function"
			);
		},

		/**
		 * Tests Objs method invalid classpath argument errors
		 */
		testCreateInvalidClasspathParameter: function()
		{
			var expectedErrorMessage/*String*/ = "Invalid classpath: ";
		
			YUITest.Assert.throwsError
			(
				expectedErrorMessage + "null",
				function(){Objs(null,{})},
				"An error should have been thrown."
			);
			
			YUITest.Assert.throwsError
			(
				expectedErrorMessage + "undefined",
				function(){Objs(undefined,{})},
				"An error should have been thrown."
			);
			
			//Not a string
			YUITest.Assert.throwsError
			(
				expectedErrorMessage + "[object Object]",
				function(){Objs({},{})},
				"An error should have been thrown."
			);
		},

		/**
		 * Tests Objs method invalid superclass argument errors
		 */
		testCreateSuperClassAsStringParameter: function()
		{
			var expectedErrorMessage/*String*/ = "Unexistent superclass: ";

			YUITest.Assert.throwsError
			(
				expectedErrorMessage + "",
				function(){Objs("MyClass","")},
				"An error should have been thrown."
			);
			
			YUITest.Assert.throwsError
			(
				expectedErrorMessage + "MyUnexistentSuperClass",
				function(){Objs("MyClass","MyUnexistentSuperClass")},
				"An error should have been thrown."
			);
		},
		
		/**
		 * Tests Objs() using Objs() method.
		 */
		testCreateAndGet: function()
		{
			var classpath/*String*/ = "com.website.myclasspath.TestAddAndGet";
			var constructor/*Function*/ = Objs( classpath );
			
			YUITest.Assert.areEqual
			(
				constructor,
				Objs(classpath),
				"Expected Objs( classpath ) to return the registered constructor"
			);
		},
		
		/**
		 * Tests Objs(classpath) called twice with the same classpath.
		 */
		testCreateTwice: function()
		{
			var classpath/*String*/ = "com.website.myclasspath.TestAddTwice";
			var constructor1/*Function*/ = Objs( classpath );
			var constructor2/*Function*/ = Objs( classpath );
			
			YUITest.Assert.areEqual
			(
				constructor1,
				constructor2,
				"Expected constructor1 and constructor2 to be the same"
			);
		},
		
		/**
		 * Tests Objs() method <code>protobject</code> used as 2nd argument.
		 */
		testProtobject: function()
		{
			var classpath/*String*/ = "com.website.myclasspath.TestProtobject";
			var MyClass/*Function*/ = Objs
			(
				classpath,
				{
					myProp: 41,
					myFunc: function()
					{
						this.myProp++;
					}
				}
			);
			
			var myClass/*MyClass*/ = new MyClass();
			myClass.myFunc();

			YUITest.Assert.areEqual
			(
				42,
				myClass.myProp,
				"Expected myClass.myProp to be 42"
			);
		},
		
		/**
		 * Tests Objs() method with <code>SuperClass</code> used as 2nd
		 * argument.
		 */
		testSuperClassAsFunction: function()
		{
			var superclasspath/*String*/ = "com.website.myclasspath.MySuperClass0";
			var subclasspath/*String*/ = "com.website.myclasspath.MySubClass0";
			var sub2classpath/*String*/ = "com.website.myclasspath.MySub2Class0";
			
			var SuperClass/*Function*/ = Objs( superclasspath );
			var SubClass/*Function*/ = Objs( subclasspath, SuperClass );

			YUITest.Assert.isInstanceOf
			(
				SuperClass,
				new SubClass(),
				"Expected SubClass to be an instance of SuperClass"
			);
			
			var sub2class/*Function*/ = Objs( sub2classpath, SubClass );

			YUITest.Assert.isInstanceOf
			(
				SuperClass,
				new sub2class(),
				"Expected sub2class to be an instance of SuperClass"
			);
		},
		
		/**
		 * Tests Objs() method with <code>SuperClass</code> used as String
		 * as 2nd argument.
		 */
		testSuperClassAsString: function()
		{
			var superclasspath/*String*/ = "com.website.myclasspath.MySuperClass1";
			var subclasspath/*String*/ = "com.website.myclasspath.MySubClass1";
			var sub2classpath/*String*/ = "com.website.myclasspath.MySub2Class1";
			
			var SuperClass/*Function*/ = Objs( superclasspath );
			var SubClass/*Function*/ = Objs( subclasspath, superclasspath );

			YUITest.Assert.isInstanceOf
			(
				SuperClass,
				new SubClass(),
				"Expected SubClass to be an instance of SuperClass"
			);
			
			var sub2class/*Function*/ = Objs( sub2classpath, subclasspath );

			YUITest.Assert.isInstanceOf
			(
				SuperClass,
				new sub2class(),
				"Expected sub2class to be an instance of SuperClass"
			);
		},
			
		/**
		 * Tests Objs() method with <code>SuperClass</code> used as 2nd
		 * argument and <code>protobject</code> used as 3nd argument.
		 */
		testSuperClassPlusProtobject: function()
		{
			var superclasspath/*String*/ = "com.website.myclasspath.MySuperClass2";
			var subclasspath/*String*/ = "com.website.myclasspath.MySubClass2";
			
			var SuperClass/*Function*/ = Objs
			(
				subclasspath,
				{ 
					myProp: 41
				}
			);
			
			var SubClass/*Function*/ = Objs
			(
				subclasspath,
				SuperClass,
				{
					myFunc: function()
					{
						this.myProp++;
					}
				}
			);

			YUITest.Assert.isInstanceOf
			(
				SuperClass,
				new SubClass(),
				"Expected SubClass to be an instance of SuperClass"
			);

			var subClass/*SubClass*/ = new SubClass();
			subClass.myFunc();

			YUITest.Assert.areEqual
			(
				42,
				subClass.myProp,
				"Expected subClass.myProp to be 42"
			);
		},

		/**
		 * Tests if the initialize method of each class is called and respect
		 * the recursion order.
		 */
		testInitialize: function()
		{
			var superclasspath/*String*/ = "com.website.myclasspath.MySuperClass3";
			var subclasspath/*String*/ = "com.website.myclasspath.MySubClass3";
			var sub2classpath/*String*/ = "com.website.myclasspath.MySub2Class3";
	
			var proof/*String*/ = "";
			var SuperClass/*Function*/ = Objs(superclasspath);
			SuperClass.prototype.initialize = function()
			{
				proof += "1";
			}

			var SubClass/*Function*/ = Objs( subclasspath, SuperClass );
			SubClass.prototype.initialize = function()
			{
				SubClass.$super.initialize.call(this);
				proof += "2";
			}

			var Sub2class/*Function*/ = Objs( sub2classpath, SubClass );
			Sub2class.prototype.initialize = function()
			{
				Sub2class.$super.initialize.call(this);
				proof += "3";
			}
			
			new Sub2class();

			YUITest.Assert.areEqual
			(
				"123",
				proof,
				"Expected intialize to be called recursively in the right order on each method"
			);
		},

		/**
		 * Tests if the initialize method of each class is called and respect
		 * the recursion order.
		 */
		testInitializeParameters: function()
		{
			var superclasspath/*String*/ = "com.website.myclasspath.MySuperClass4";
			var subclasspath/*String*/ = "com.website.myclasspath.MySubClass4";
			var sub2classpath/*String*/ = "com.website.myclasspath.MySub2Class4";
	
			var proof/*String*/ = "";
			var SuperClass/*Function*/ = Objs(superclasspath);
			SuperClass.prototype.initialize = function(arg)
			{
				proof += arg;
			}

			var SubClass/*Function*/ = Objs( subclasspath, SuperClass );
			SubClass.prototype.initialize = function(arg)
			{
				SubClass.$super.initialize.call( this, "1" );
				proof += arg;
			}

			var Sub2class/*Function*/ = Objs( sub2classpath, SubClass );
			Sub2class.prototype.initialize = function(arg)
			{
				Sub2class.$super.initialize.call( this, "2" );
				proof += arg;
			}
			
			new Sub2class("3");

			YUITest.Assert.areEqual
			(
				"123",
				proof,
				"Expected intialize to be called with arguments recursively in the right order on each method"
			);
		},

		/**
		 * Tests if the initialize method respect recursion call order even if
		 * the inheritance chain is broken by a subclass not declaring its
		 * initialize method.
		 */
		testInitializeNotDeclaredInChain: function()
		{
			var superclasspath/*String*/ = "com.website.myclasspath.MySuperClass5";
			var subclasspath/*String*/ = "com.website.myclasspath.MySubClass5";
			var sub2classpath/*String*/ = "com.website.myclasspath.MySub2Class5";

			var proof/*String*/ = "";
			var SuperClass/*Function*/ = Objs(superclasspath);
			SuperClass.prototype.initialize = function()
			{
				proof += "1";
			}

			var SubClass/*Function*/ = Objs( subclasspath, SuperClass );
			var Sub2class/*Function*/ = Objs( sub2classpath, SubClass );
			Sub2class.prototype.initialize = function()
			{
				Sub2class.$super.initialize.call(this);
				proof += "2";
			}

			new Sub2class();

			YUITest.Assert.areEqual
			(
				"12",
				proof,
				"Expected intialize to be called with arguments recursively in the right order on each method"
			);
		},
		
		/**
		 * Tests if the initialize method respect recursion call order even if
		 * the inheritance chain is broken by the first class in the prototype
		 * chain not declaring its initialize method.
		 */
		testInitializeNotDeclared: function()
		{
			var superclasspath/*String*/ = "com.website.myclasspath.MySuperClass6";
			var subclasspath/*String*/ = "com.website.myclasspath.MySubClass6";
			var sub2classpath/*String*/ = "com.website.myclasspath.MySub2Class6";

			var proof/*String*/ = "";
			var SuperClass/*Function*/ = Objs(superclasspath);
			SuperClass.prototype.initialize = function()
			{
				proof += "1";
			}

			var SubClass/*Function*/ = Objs( subclasspath, SuperClass );
			SubClass.prototype.initialize = function()
			{
				SubClass.$super.initialize.call(this);
				proof += "2";
			}
			
			var Sub2class/*Function*/ = Objs( sub2classpath, SubClass );
			
			
			//TODO Need to be explored ... there's something still not well managed that happens here
			new Sub2class();

			YUITest.Assert.areEqual
			(
				"12",
				proof,
				"Expected intialize to be called with arguments recursively in the right order on each method"
			);
		},
		
		/**
		 * Tests if the initialize method respect recursion call order even if
		 * the inheritance chain is broken by a subclass not declaring its
		 * initialize method.
		 */
		testInitializeThis: function()
		{
			var superclasspath/*String*/ = "com.website.myclasspath.MySuperClass7";
			var subclasspath/*String*/ = "com.website.myclasspath.MySubClass7";
			var sub2classpath/*String*/ = "com.website.myclasspath.MySub2Class7";

			var proof/*String*/ = "";
			var SuperClass/*Function*/ = Objs(superclasspath);
			SuperClass.prototype.initialize = function()
			{
				this.proof += "1";
			}

			var SubClass/*Function*/ = Objs( subclasspath, SuperClass );
			SubClass.prototype.initialize = function()
			{
				SubClass.$super.initialize.call(this);
				this.proof += "2";
			}
			
			var Sub2class/*Function*/ = Objs( sub2classpath, SubClass );
			Sub2class.prototype.proof = "0";
			
			//TODO Need to be explored ... there's something still not well managed that happens here
			var testClass/*sub2class*/ = new Sub2class();

			YUITest.Assert.areEqual
			(
				"012",
				testClass.proof,
				"Expected intialize to be called with arguments recursively in the right order on each method"
			);
		},
	
		/**
		 * Tests if we can call the superclass methods from a subclass.
		 */
		testSuperMethods: function()
		{
			var superclasspath/*String*/ = "com.website.myclasspath.MySuperClass8";
			var subclasspath/*String*/ = "com.website.myclasspath.MySubClass8";

			var proof/*String*/ = "";
			var SuperClass/*Function*/ = Objs
			(
				superclasspath,
				{
					proof : "",

					method1 : function()
					{
						this.proof += "SuperClassMethod1";
					},
				
					method2 : function()
					{
						this.proof += "SuperClassMethod2";
					}
				}
			);

			var SubClass/*Function*/ = Objs
			(
				subclasspath,
				SuperClass,
				{
					method1 : function()
					{
						SubClass.$super.method1.call(this);
						
						this.proof += "SubClassMethod1";
					},
				
					method2 : function()
					{
						SubClass.$super.method2.call(this);
						
						this.proof += "SubClassMethod2";
					}
				}
			);
			
			//TODO Need to be explored ... there's something still not well managed that happens here
			var testClass/*sub2class*/ = new SubClass();
			testClass.method1();
			testClass.method2();

			YUITest.Assert.areEqual
			(
				"SuperClassMethod1SubClassMethod1SuperClassMethod2SubClassMethod2",
				testClass.proof,
				"Expected methods to be called recursively in the right order"
			);
		}
  	}
);